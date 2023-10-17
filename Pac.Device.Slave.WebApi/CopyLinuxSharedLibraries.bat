SET SOURCE_DIR=%1
SET DESTINATION_DIR=%2

REM For debugging, print location

CALL CD
ECHO %SOURCE_DIR%
ECHO %DESTINATION_DIR%

REM Copy dependencies required by this project

XCOPY %SOURCE_DIR%\*.so %DESTINATION_DIR% /D /Y
