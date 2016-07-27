# intelligent-semaphore
A tesis project based on regulate the time of the semaphores to reduce congestion.

[![Code Coverage](https://img.shields.io/codecov/c/github/pvorb/property-providers/develop.svg)](https://codecov.io/github/pvorb/property-providers?branch=develop)

#Instalation process

*Step 1: Download Java SDK*
------
http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

Optional - Make sure to have the JRE installed

*Step 2: Configure JAVA_HOME*
------
http://aprenderaprogramar.com/index.php?option=com_content&view=article&id=389:configurar-java-en-windows-variables-de-entorno-javahome-y-path-cu00610b&catid=68:curso-aprender-programacion-java-desde-cero&Itemid=188

*Step 3: Run the first time*
------
The first time you run the project, gradle will download the google app engine sdk, so it will take a wile to complete.
It's recomended to run `gradlew build` in order to see the progress of the task. You can run it in the terminal of Intellij pressing `Alt + F12` to open it.

*Step 4 - OPTIONAL: Run configuration*
------
Configure your run configurations adding two gradle configurations: https://www.jetbrains.com/help/idea/2016.1/creating-and-editing-run-debug-configurations.html, selecting the gradle project in `Gradle Project` and:
  1. Server loaded: `Name: Gradle` + `Tasks: appengineRun`
  2. Front-end reload: `Name: Reload` + `Tasks: customReload`
