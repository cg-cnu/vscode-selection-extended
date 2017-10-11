'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // select till start of file
    let tillSOF = vscode.commands.registerCommand('selection.tillSOF', () => {
        const editor: vscode.TextEditor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage("No file open");
            return;
        }
        editor.selection = new vscode.Selection(
            new vscode.Position(0, 0),
            editor.selection.start
        )
    });
    context.subscriptions.push(tillSOF);
    // select till end of file
    let tillEOF = vscode.commands.registerCommand('selection.tillEOF', () => {
        const editor: vscode.TextEditor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No file open");
            return;
        }
        editor.selection = new vscode.Selection(
            editor.selection.end,
            editor.document.lineAt(editor.document.lineCount - 1).range.end
        )
    });
    context.subscriptions.push(tillEOF);
    // select inverse 
    let inverse = vscode.commands.registerCommand('selection.inverse', () => {
        const editor: vscode.TextEditor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No file open");
            return;
        }
        editor.selections = [
            new vscode.Selection(
                new vscode.Position(0, 0), 
                editor.selection.start
            ),
            new vscode.Selection(
                editor.selection.end, 
                editor.document.lineAt(editor.document.lineCount - 1).range.end
            )
        ]
    });
    context.subscriptions.push(inverse);
}

export const deactivate = () => { }