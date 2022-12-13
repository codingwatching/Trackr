@echo off  
set "command=%1"

IF not exist node_modules\ (
    npm i
)

set GENERATE_SOURCEMAP=false

IF "%command%"=="clean" (
    npm i
)

IF "%command%"=="run" (
    npm run start
)

IF "%command%"=="build" (
    npm run build
) ELSE (
    IF "%command%"=="" (
        npm run build
    )
)