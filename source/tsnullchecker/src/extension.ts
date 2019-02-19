// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tsnullchecker" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('TsNullChecker.checkNulls', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user

		if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.selection) {
			const selection = vscode.window.activeTextEditor.selection;
			const text = vscode.window.activeTextEditor.document.getText(selection);
			const resultParts = [];
			let actualPart = '';
			for (const part of text.split('.')) {
				if (part === 'this') {
					actualPart = part;
					continue;
				}
				const indexRegex = /\[[.+]+\]/;
				let match = indexRegex.exec(part);
				while (match) {
					resultParts.push(combineParts(actualPart, part.substr(0, match.index)));
					match = indexRegex.exec(part);
				}

				actualPart = combineParts(actualPart, part);
				resultParts.push(actualPart);
			}

			console.debug(resultParts);
			const finalText = 'if(' + resultParts.join('\n&& ') + '){\n' + text + '\n}';
			vscode.window.activeTextEditor.edit(editBuilder => editBuilder.replace(selection, finalText));
		}
	});

	context.subscriptions.push(disposable);
}

function combineParts(actualPart: string, newPart: string): string {
	if (actualPart && actualPart !== '') {
		return actualPart + '.' + newPart;
	} else {
		return newPart;
	}
}

// this method is called when your extension is deactivated
export function deactivate() { }
