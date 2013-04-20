del *.xpi
set TIMESTAMP=%date%%time: =0%
set TIMESTAMP=%TIMESTAMP:,=%
set TIMESTAMP=%TIMESTAMP::=%
set TIMESTAMP=%TIMESTAMP:.=%
@echo %TIMESTAMP%
7za a -tzip passtasticFF%TIMESTAMP%.xpi .\files\*