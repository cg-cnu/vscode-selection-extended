'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {


    let tillSOF = vscode.commands.registerCommand('selection.tillSOF', () => {
        // get the active text editor
        const editor: vscode.TextEditor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No file open");
            return;
        }
        
        const docStart = new vscode.Position(0,0);
        const docEnd = editor.document.lineAt(editor.document.lineCount-1).range.end
        const selectionStart = editor.selection.start;
        const selectionEnd = editor.selection.end

        // top selection 
        const topSelection = new vscode.Selection(docStart, selectionStart)
        editor.selection = topSelection;
    });
    context.subscriptions.push(tillSOF);

    let tillEOF = vscode.commands.registerCommand('selection.tillEOF', () => {
        
        // get the active text editor
        const editor: vscode.TextEditor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No file open");
            return;
        }
        const docStart = new vscode.Position(0,0);
        const docEnd = editor.document.lineAt(editor.document.lineCount-1).range.end    
        const selectionStart = editor.selection.start;
        const selectionEnd = editor.selection.end
        const bottomSelection = new vscode.Selection(selectionEnd, docEnd)
        editor.selection = bottomSelection;
    });
    context.subscriptions.push(tillEOF);

    let inverse = vscode.commands.registerCommand('selection.inverse', () => {
        
        // get the active text editor
        const editor: vscode.TextEditor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No file open");
            return;
        }

        const docStart = new vscode.Position(0,0);
        const docEnd = editor.document.lineAt(editor.document.lineCount-1).range.end    
        const selectionStart = editor.selection.start;
        const selectionEnd = editor.selection.end

        const topSelection = new vscode.Selection(docStart, selectionStart)
        const bottomSelection = new vscode.Selection(selectionEnd, docEnd)
        editor.selections = [topSelection, bottomSelection]
    });
    context.subscriptions.push(inverse);

}

export const deactivate = () => { }