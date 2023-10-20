# 2_obligatoriske

expo install @react-navigation/native @react-navigation/native-stack react-native-qrcode-svg firebase react-native-paper @react-native-async-storage/async-storage @react-native-firebase/app firebase-admin @react-navigation/bottom-tabs @react-native-firebase/firestore expo-camera expo-image-picker react-native-maps expo-constants expo-location


Create a react native expo app with the purpose of being a platform where users can view different companies and their stamp cards. A stamp card should have 8 spots for stamps and when the user gets the 8th stamp then will the user get a coupon for a free item. The app needs to store data and receive data from a firebase database.
I need these views:
- A HomeScreen where there is a navigation bar at the top that have buttons that navigate the user to the other views.
- A CreateCompanyScreen where you can create a company profile and this data should be viewed on AllCompaniesScreen.
- A CreateCouponScreen where the company is able to create their stamp card for the users.
- An AllCompaniesScreen where the user can view which companies have a profile on the app and their QR code.
- A CouponsScreen where the user will be able to view their coupon when they have gotten their 8th stamp on their stamp card.