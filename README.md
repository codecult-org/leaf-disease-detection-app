### android app for leaf disease detection project using react-native-cli

#### contributing 101

> run locally

```
npm i
npx react-native start -> a
```

> troubleshooting

```
rm -rf android/app/build # optional
npm cache clean --force # optional

rm -rf node_modules
npm i
cd android && ./gradlew clean && cd ..
npx react-native start --reset-cache
```

> generating final apk

```
cd android && ./gradlew assembleRelease

```
