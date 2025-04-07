import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
const logoImg = require("../assets/home-background.png");
const googleImg = require("../assets/google.png");
import { commonStyles } from "../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/StackNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SignUp = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <View style={styles.backgroundImage}>
        <Image source={logoImg} style={styles.backgroundImage} />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Sign Up</Text>
          <View style={styles.loginTextContainer}>
            <Text style={styles.accountText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.nameContainer}>
          <View style={[styles.inputContainer, styles.halfWidth]}>
            <TextInput
              style={styles.textInputContainer}
              placeholder="First Name"
            />
          </View>

          <View style={[styles.inputContainer, styles.halfWidth]}>
            <TextInput
              style={styles.textInputContainer}
              placeholder="Last Name"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInputContainer}
            placeholder="Loisbecket@gmail.com"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInputContainer}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddTask")}
        >
          <Text style={commonStyles.addButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Or Divider */}
        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.orLine} />
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={styles.googleButton}>
            <Image source={googleImg} style={styles.googleLogo} />
            <Text style={styles.googleButtonText}>Sign up with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 15,
    fontFamily: "Inter-Regular",
  },

  textInputContainer: {
    borderWidth: 0.1,
    shadowColor: "black",
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 15,
    fontSize: 14,
  },

  text: {
    fontSize: 30,
  },
  backgroundImage: {
    width: "100%",
    height: 230,
  },
  cardsView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -40,
    gap: 10,
    marginHorizontal: 10,
  },
  textContainer: {
    position: "absolute",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 80,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Inter-Bold",
    color: "white",
    marginTop: 14,
  },
  addButton: {
    backgroundColor: "#5E35B1",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 14,
  },

  completedSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B1B1D",
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  taskListContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 20,
    marginHorizontal: 10,
    elevation: 1,
    padding: 5,
  },
  noTasksText: {
    textAlign: "center",
    margin: 20,
    fontSize: 16,
    color: "#0000000",
    fontFamily: "Inter-Bold",
  },

  container: {
    flex: 1,
    backgroundColor: "#4A3780",
  },
  header: {},
  backButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  titleContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  loginTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  accountText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  loginLink: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  halfWidth: {
    width: "48%",
  },
  inputContainer: {
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },

  countryCodeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
    height: "100%",
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 5,
  },
  chevronDown: {
    fontSize: 10,
    color: "#888",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 5,
  },
  eyeIconText: {
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: "#4169e1",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    color: "#888",
    fontSize: 14,
    marginHorizontal: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 12,
  },
  googleLogo: {
    width: 22,
    height: 22,
    marginRight: 10,
    color: "#4285F4",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 24,
  },
  googleButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default SignUp;
