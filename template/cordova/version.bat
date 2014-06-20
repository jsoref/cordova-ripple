@ECHO OFF
SET script_path="%~dp0version"
IF EXIST %script_path% (
        node %script_path% %*
) ELSE (
    ECHO.
    ECHO ERROR: Could not find 'version' script in 'cordova' folder, aborting...>&2
    EXIT /B 1
)
