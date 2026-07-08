Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Get directory of the script
ScriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
WshShell.CurrentDirectory = ScriptDir

' Check if Node.js is installed
On Error Resume Next
WshShell.Run "node --version", 0, True
If Err.Number <> 0 Then
    MsgBox "Error: Node.js is not installed or not in PATH. Please run the installer (setup-win.exe) first.", 16, "PCM Quotation System"
    Wscript.Quit 1
End If
On Error GoTo 0

' Run startup.bat invisibly (window style 0, waitOnReturn False)
WshShell.Run "cmd.exe /c startup.bat", 0, False
