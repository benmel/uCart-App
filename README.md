# uCart-App
This is the front-end application for uCart. It's an Angular application that uses Cordova to run on an Android tablet.

### Installation
1. `brew install node` (on OS X)
2. `npm install -g bower`
3. `npm install -g grunt-cli`
4. `npm install -g cordova`
5. `npm install -g ionic`
6. `gem install compass`
7. `git clone https://github.com/benmel/uCart-App.git`
8. `cd uCart-App`
9. `bower install`
10. `npm install`

### Run application
`grunt serve`

### Android emulator installation
See this [link](https://github.com/diegonetto/generator-ionic/blob/master/docs/android.md)

1. Install Java from [here](https://support.apple.com/kb/DL1572)
2. Download and install Android Studio from [here](https://developer.android.com/sdk/index.html)
3. `touch ~/.bash_profile; open ~/.bash_profile`
4. To `~/.bash_profile` add:
```
   export PATH=/user/local/bin:$PATH
   export PATH=$PATH:<path to sdk/tools>
   export PATH=${PATH}:<path to sdk/tools>:<path to sdk/tools>
```
   `<path to sdk>` is something like `/Users/Ben/Library/Android/sdk/tools` 
5. `source ~/.bash_profile`
6. `brew install ant`
7. `android`
8. For Android 4.4.2 install SDK platform and ARM system image
9. Click Tools -> Manage AVDs...
10. Create Android Virtual Device using Nexus 7
11. Close Android SDK Manager
12. `brew install android-platform-tools`
13. `grunt platform:add:android`

### Run Android emulator
1. `grunt build`
2. `grunt emulate:android` 
3. `ctrl`+`fn`+`F11` for landscape