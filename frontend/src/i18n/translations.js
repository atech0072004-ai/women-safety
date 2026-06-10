export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About",
      emergency: "Emergency",
      dashboard: "Dashboard",
      report: "Report Incident",
      tips: "Safety Tips",
      checklist: "Safety Checklist",
      fakecall: "Fake Call Simulator",
      contact: "Contact",
      login: "Login/Register",
      logout: "Logout",
      systemArmed: "Armed & Secure",
      admin: "Admin Command",
      helplines: "Police & Helplines"
    },
    // Home Page
    home: {
      heroTitle: "Your Safety, Our Priority",
      heroSubtitle: "Instant emergency assistance, real-time location monitoring, and secure incident reporting platform for women.",
      sosButton: "Get Instant Help",
      statsShield: "Active Users Safeguarded",
      statsSiren: "SOS Alerts Dispatched",
      statsReport: "Incidents Addressed",
      featuresTitle: "Core Safety Ecosystem",
      featuresSubtitle: "Equipped with real-time detection, instant alerts, and visual aids to navigate any environment.",
      featureSosTitle: "One-Tap SOS Alert",
      featureSosDesc: "Quick-trigger high decibel siren alarm and dispatch location coordinates to family instantly.",
      featureMapTitle: "Safe Route Tracker",
      featureMapDesc: "Locate nearby police desks, safe havens, and medical facilities on a live map.",
      featureReportTitle: "Report & Archive",
      featureReportDesc: "Log incidents securely. Upload images and choose anonymous mode to warn security teams.",
      themeMode: "Toggle Dark/Light Mode"
    },
    // About Page
    about: {
      title: "About SafeHer Project",
      subtitle: "A digital sanctuary providing tools to prep, protect, and empower women in critical situations.",
      missionTitle: "Our Mission",
      missionDesc: "SafeHer is dedicated to reducing response times during emergency crises. We merge client-side warning capabilities with real-time tracking to make daily commuting, travelling, and digital connectivity safer.",
      helplinesTitle: "National Women Helplines (India)",
      helplinePolice: "Police Emergency",
      helplineNational: "National Women Helpline",
      helplineStudent: "Student Helpdesk",
      helplineDomestic: "Domestic Abuse Helpline"
    },
    // Emergency Panel
    emergency: {
      title: "Crisis SOS Response",
      statusReady: "SYSTEM STABLE & DISPATCH READY",
      statusAlert: "SOS ACTIVE - EMERGENCY NOTIFICATION SENT",
      btnTrigger: "TRIGGER EMERGENCY SOS",
      btnDisarm: "DISARM EMERGENCY ALARM",
      sirenOn: "Siren Alarm On",
      sirenOff: "Siren Alarm Off",
      gpsCoords: "Live GPS Coordinates",
      gpsNote: "Accuracy depends on device GPS capabilities. Coordinates are attached to emergency dispatches automatically.",
      shareMsg: "Share Location Link",
      nearbyTitle: "Emergency Resources Nearby",
      policeDesk: "Police Stations",
      hospitals: "Hospitals",
      loadingMap: "Loading emergency map tracker..."
    },
    // Incident Reporting
    report: {
      title: "Secure Incident Logging",
      subtitle: "Log harassment, unsafe spaces, or security issues. Choose anonymous mode to secure your identity.",
      formTitle: "incident report card",
      labelTitle: "Incident Description",
      placeTitle: "Explain what happened briefly...",
      labelLocation: "Location Coordinates / Address",
      placeLocation: "e.g. Sector 12, Market Square",
      labelCategory: "Category",
      catHarassment: "Street Harassment",
      catStalking: "Stalking/Following",
      catUnsafeArea: "Unsafe Infrastructure/Lighting",
      catOther: "Other Safety Risk",
      labelUpload: "Evidence Attachment (Image/Audio)",
      labelAnon: "Submit Anonymously",
      btnSubmit: "File Official Report",
      historyTitle: "Your Filed Logs",
      noHistory: "No logged incidents reported yet."
    },
    // Safety Tips Page
    tips: {
      title: "Survival & Prep Guides",
      subtitle: "Knowledge is the first line of defense. Read quick-prep tips to protect yourself.",
      catAll: "All Guides",
      catPhysical: "Physical Defense",
      catCyber: "Cyber Safety",
      catTravel: "Travel & Transit"
    },
    // Contact Page
    contact: {
      title: "Get In Touch",
      subtitle: "Have suggestions, technical bugs, or partnership proposals? Send us a message.",
      labelName: "Your Name",
      labelEmail: "Your Email",
      labelMsg: "Message Details",
      btnSend: "Transmit Message"
    },
    // Authentication
    auth: {
      loginTitle: "Welcome Back",
      registerTitle: "Join Safety Circle",
      email: "Email Address",
      password: "Password",
      name: "Display Name",
      btnSignIn: "Sign In Securely",
      btnSignUp: "Register Account",
      btnGoogle: "Sign In with Google",
      btnForgot: "Forgot Password?",
      toggleSignUp: "Don't have an account? Register",
      toggleSignIn: "Already have an account? Login",
      forgotSubtitle: "Enter email to receive reset code link",
      btnSendReset: "Send Reset Link"
    },
    // Dashboard
    dashboard: {
      title: "Safety Command Center",
      subtitle: "Manage your emergency configurations, circle members, and logged history.",
      btnNewContact: "Add Trusted Contact",
      contactsTitle: "Your Guardians Circle (Trusted Contacts)",
      noContacts: "No guardians added yet. Please add contacts to dispatch alerts to.",
      historyTitle: "SOS Trigger History",
      noHistory: "No emergency alerts triggered recently.",
      labelRel: "Relationship",
      labelPhone: "Phone Number",
      btnCall: "Trigger Quick Call",
      btnDelete: "Remove Guardian",
      mockStatus: "Running on Mock Storage mode. Configure Supabase to save online."
    },
    admin: {
      title: "Admin Command Center",
      subtitle: "Monitor emergency dispatches, incident reports, and system configurations.",
      totalSOS: "Total SOS Alerts",
      totalReports: "Total Complaints",
      totalUsers: "Registered Users",
      sosTable: "Emergency SOS Alerts Log",
      reportsTable: "Submitted Incident Reports Desk",
      contactsTable: "Trusted Contacts Circle Directory",
      noAlerts: "No active SOS alerts found.",
      noReports: "No incident reports logged.",
      noContacts: "No contact logs registered in database.",
      colUser: "User Profile",
      colTime: "Timestamp",
      colCoords: "GPS Location",
      colAction: "Actions",
      colStatus: "Status Update",
      colCategory: "Category",
      colDetails: "Description Details",
      colLoc: "Address / Coordinates",
      statusPending: "Pending Review",
      statusInvestigating: "Investigating Case",
      statusResolved: "Resolved Case",
      btnUpdate: "Update Status",
      btnDelete: "Remove Entry"
    },
    helplines: {
      title: "Police & Emergency Helplines",
      subtitle: "Instant direct calling to national helplines and nearby emergency assistance checkpoints.",
      searchPlaceholder: "Search local safety stations by locality, city, or district...",
      stationsTitle: "Nearest Local Police Outlets",
      dialBtn: "Initiate Emergency Call",
      viewMapBtn: "Locate on Safety Map"
    },
    chat: {
      welcome: "Hello! I am your SafeHer Shield assistant. How can I help you be prepared and secure today?",
      placeholder: "Ask about SOS button, filing reports, or self-defense guides...",
      send: "Transmit Query"
    },
    alerts: {
      failReport: "Filing report failed. Check console details.",
      geoNotSupported: "Geolocation is not supported by your browser.",
      copiedSOS: "Location SOS link copied to clipboard!"
    }
  },
  hi: {
    // Navigation
    nav: {
      home: "मुख्य पृष्ठ",
      about: "हमारे बारे में",
      emergency: "आपातकालीन",
      dashboard: "डैशबोर्ड",
      report: "घटना रिपोर्ट",
      tips: "सुरक्षा टिप्स",
      checklist: "सुरक्षा चेकलिस्ट",
      fakecall: "नकली कॉल सिम्युलेटर",
      contact: "संपर्क करें",
      login: "लॉगिन/रजिस्टर",
      logout: "लॉगआउट",
      systemArmed: "सक्रिय और सुरक्षित",
      admin: "एडमिन कमांड",
      helplines: "पुलिस और हेल्पलाइन"
    },
    // Home Page
    home: {
      heroTitle: "आपकी सुरक्षा, हमारी प्राथमिकता",
      heroSubtitle: "महिलाओं के लिए त्वरित आपातकालीन सहायता, वास्तविक समय स्थान ट्रैकिंग और सुरक्षित घटना रिपोर्टिंग प्लेटफॉर्म।",
      sosButton: "त्वरित सहायता लें",
      statsShield: "सक्रिय उपयोगकर्ता सुरक्षित",
      statsSiren: "एसओएस अलर्ट भेजे गए",
      statsReport: "सुलझाई गई घटनाएं",
      featuresTitle: "मूल सुरक्षा पारिस्थितिकी तंत्र",
      featuresSubtitle: "किसी भी वातावरण में मदद के लिए वास्तविक समय पर अलर्ट और सुरक्षा उपकरण।",
      featureSosTitle: "एक-टैप एसओएस अलर्ट",
      featureSosDesc: "तेज़ सायरन बजाएं और आपातकालीन स्थान तुरंत परिवार को भेजें।",
      featureMapTitle: "सुरक्षित मार्ग ट्रैकर",
      featureMapDesc: "नक्शे पर नजदीकी पुलिस थानों, सुरक्षित स्थानों और अस्पतालों का पता लगाएं।",
      featureReportTitle: "रिपोर्ट और संग्रह",
      featureReportDesc: "सुरक्षित रिपोर्ट दर्ज करें। साक्ष्य अपलोड करें और गुमनाम मोड चुनें।",
      themeMode: "लाइट/डार्क मोड बदलें"
    },
    // About Page
    about: {
      title: "SafeHer परियोजना के बारे में",
      subtitle: "गंभीर परिस्थितियों में सुरक्षा, तैयारी और सशक्तिकरण के उपकरण।",
      missionTitle: "हमारा उद्देश्य",
      missionDesc: "SafeHer आपातकालीन संकट के दौरान त्वरित सहायता पहुंचाने के लिए समर्पित है। हमारा उद्देश्य यात्रा और दैनिक जीवन को महिलाओं के लिए अधिक सुरक्षित और तनावमुक्त बनाना है।",
      helplinesTitle: "राष्ट्रीय महिला हेल्पलाइन (भारत)",
      helplinePolice: "पुलिस आपातकालीन",
      helplineNational: "राष्ट्रीय महिला हेल्पलाइन",
      helplineStudent: "छात्र हेल्पडेस्क",
      helplineDomestic: "घरेलू हिंसा हेल्पलाइन"
    },
    // Emergency Panel
    emergency: {
      title: "संकट एसओएस प्रतिक्रिया",
      statusReady: "प्रणाली तैयार है - भेजने के लिए तत्पर",
      statusAlert: "एसओएस सक्रिय - आपातकालीन सूचना भेजी गई",
      btnTrigger: "एसओएस अलार्म चालू करें",
      btnDisarm: "अलार्म बंद करें",
      sirenOn: "सायरन चालू है",
      sirenOff: "सायरन बंद है",
      gpsCoords: "लाइव जीपीएस स्थान",
      gpsNote: "स्थान की सटीकता डिवाइस जीपीएस पर निर्भर करती है। आपातकालीन एसएमएस में लिंक खुद जुड़ जाएगा।",
      shareMsg: "स्थान साझा करें लिंक",
      nearbyTitle: "आसपास के आपातकालीन संसाधन",
      policeDesk: "पुलिस स्टेशन",
      hospitals: "अस्पताल",
      loadingMap: "नक्शा ट्रैकर लोड हो रहा है..."
    },
    // Incident Reporting
    report: {
      title: "सुरक्षित घटना रिपोर्टिंग",
      subtitle: "उत्पीड़न या असुरक्षित क्षेत्रों की रिपोर्ट दर्ज करें। अपनी पहचान छिपाने के लिए गुमनाम मोड चुनें।",
      formTitle: "घटना रिपोर्ट कार्ड",
      labelTitle: "घटना का विवरण",
      placeTitle: "संक्षेप में बताएं कि क्या हुआ...",
      labelLocation: "स्थान / पता",
      placeLocation: "उदा. सेक्टर 12, मार्केट स्क्वायर",
      labelCategory: "श्रेणी",
      catHarassment: "सड़क पर उत्पीड़न",
      catStalking: "पीछा करना/पीछे आना",
      catUnsafeArea: "असुरक्षित क्षेत्र/कम रोशनी",
      catOther: "अन्य सुरक्षा जोखिम",
      labelUpload: "सबूत अटैच करें (छवि/ऑडियो)",
      labelAnon: "गुमनाम रूप से भेजें",
      btnSubmit: "आधिकारिक रिपोर्ट दर्ज करें",
      historyTitle: "आपके द्वारा दर्ज रिपोर्ट",
      noHistory: "अभी तक कोई घटना दर्ज नहीं की गई है।"
    },
    // Safety Tips Page
    tips: {
      title: "सुरक्षा एवं तैयारी गाइड",
      subtitle: "ज्ञान ही सुरक्षा की पहली सीढ़ी है। खुद को सुरक्षित रखने के लिए आवश्यक सुझाव पढ़ें।",
      catAll: "सभी सुझाव",
      catPhysical: "शारीरिक रक्षा",
      catCyber: "साइबर सुरक्षा",
      catTravel: "यात्रा सुरक्षा"
    },
    // Contact Page
    contact: {
      title: "संपर्क में रहें",
      subtitle: "सुझाव, तकनीकी खराबी या साझेदारी के लिए हमें संदेश भेजें।",
      labelName: "आपका नाम",
      labelEmail: "आपका ईमेल",
      labelMsg: "संदेश विवरण",
      btnSend: "संदेश भेजें"
    },
    // Authentication
    auth: {
      loginTitle: "वापसी पर स्वागत है",
      registerTitle: "सुरक्षा चक्र में शामिल हों",
      email: "ईमेल पता",
      password: "पासवर्ड",
      name: "प्रदर्शन नाम",
      btnSignIn: "सुरक्षित रूप से लॉगिन करें",
      btnSignUp: "पंजीकरण करें",
      btnGoogle: "गूगल के साथ लॉगिन करें",
      btnForgot: "पासवर्ड भूल गए?",
      toggleSignUp: "खाता नहीं है? रजिस्टर करें",
      toggleSignIn: "पहले से खाता है? लॉगिन करें",
      forgotSubtitle: "पासवर्ड रीसेट लिंक प्राप्त करने के लिए ईमेल दर्ज करें",
      btnSendReset: "रीसेट लिंक भेजें"
    },
    // Dashboard
    dashboard: {
      title: "सुरक्षा कमान केंद्र",
      subtitle: "अपनी आपातकालीन सेटिंग्स, विश्वसनीय संपर्कों और रिपोर्टों का प्रबंधन करें।",
      btnNewContact: "विश्वसनीय संपर्क जोड़ें",
      contactsTitle: "आपके रक्षक चक्र (विश्वसनीय संपर्क)",
      noContacts: "कोई विश्वसनीय संपर्क नहीं जोड़ा गया। कृपया आपातकालीन संदेशों के लिए संपर्क जोड़ें।",
      historyTitle: "एसओएस इतिहास",
      noHistory: "हाल ही में कोई आपातकालीन अलार्म नहीं बजाया गया।",
      labelRel: "संबंध",
      labelPhone: "फ़ोन नंबर",
      btnCall: "कॉल करें",
      btnDelete: "संपर्क हटाएं",
      mockStatus: "मॉक स्टोरेज मोड पर चल रहा है। ऑनलाइन सेव करने के लिए सुपबेस को कॉन्फ़िगर करें।"
    },
    admin: {
      title: "एडमिन कमान केंद्र",
      subtitle: "आपातकालीन अलर्ट, घटना रिपोर्ट और सुरक्षा सेटिंग्स की निगरानी करें।",
      totalSOS: "कुल एसओएस अलर्ट",
      totalReports: "कुल शिकायतें",
      totalUsers: "पंजीकृत उपयोगकर्ता",
      sosTable: "एसओएस आपातकालीन लॉग",
      reportsTable: "दर्ज की गई शिकायतों का डेस्क",
      contactsTable: "विश्वसनीय संपर्कों की निर्देशिका",
      noAlerts: "कोई सक्रिय एसओएस अलर्ट नहीं मिला।",
      noReports: "कोई घटना रिपोर्ट दर्ज नहीं है।",
      noContacts: "डेटाबेस में कोई संपर्क दर्ज नहीं है।",
      colUser: "उपयोगकर्ता प्रोफ़ाइल",
      colTime: "समय",
      colCoords: "जीपीएस स्थान",
      colAction: "कार्रवाई",
      colStatus: "स्थिति बदलें",
      colCategory: "श्रेणी",
      colDetails: "विवरण",
      colLoc: "पता / निर्देशांक",
      statusPending: "लंबित समीक्षा",
      statusInvestigating: "जांच चल रही है",
      statusResolved: "मामला सुलझाया गया",
      btnUpdate: "स्थिति बदलें",
      btnDelete: "हटाएं"
    },
    helplines: {
      title: "पुलिस और आपातकालीन हेल्पलाइन",
      subtitle: "राष्ट्रीय हेल्पलाइनों और नजदीकी आपातकालीन सहायता चौकियों तक त्वरित कॉलिंग सुविधा।",
      searchPlaceholder: "क्षेत्र, शहर या जिले द्वारा स्थानीय सुरक्षा केंद्रों की खोज करें...",
      stationsTitle: "निकटतम स्थानीय पुलिस चौकियां",
      dialBtn: "आपातकालीन कॉल करें",
      viewMapBtn: "नक्शे पर स्थान देखें"
    },
    chat: {
      welcome: "नमस्ते! मैं आपकी SafeHer शील्ड सहायक हूँ। आज मैं आपकी सुरक्षा में कैसे मदद कर सकती हूँ?",
      placeholder: "एसओएस बटन, रिपोर्ट दर्ज करने या सुरक्षा सुझावों के बारे में पूछें...",
      send: "प्रश्न भेजें"
    },
    alerts: {
      failReport: "रिपोर्ट दर्ज करने में विफल। कृपया कंसोल विवरण देखें।",
      geoNotSupported: "आपके ब्राउज़र द्वारा जियोलोकेशन (GPS) समर्थित नहीं है।",
      copiedSOS: "स्थान एसओएस लिंक क्लिपबोर्ड पर कॉपी किया गया!"
    }
  }
};
