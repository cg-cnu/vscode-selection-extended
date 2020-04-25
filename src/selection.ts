"use strict";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // select inverse
  let inverse = vscode.commands.registerCommand("selection.inverse", () => {
    const editor: vscode.TextEditor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("No file open");
      return;
    }
    let selections: Array<vscode.Selection> = [];
    let selectionStart: vscode.Position = new vscode.Position(0, 0);

    editor.selections.forEach((selection) => {
      selections.push(new vscode.Selection(selectionStart, selection.start));
      selectionStart = selection.end;
    });

    selections.push(
      new vscode.Selection(
        selectionStart,
        editor.document.lineAt(editor.document.lineCount - 1).range.end
      )
    );
    editor.selections = selections;
  });
  context.subscriptions.push(inverse);
}

export const deactivate = () => {};
