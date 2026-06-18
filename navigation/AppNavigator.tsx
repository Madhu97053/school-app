import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '../store/useAuthStore';
import { CustomTabBar } from '../components/CustomTabBar';

// Icons
import { 
  Home, Bell, Calendar, User, MessageCircle, 
  GraduationCap, Banknote, Bus, ClipboardCheck, 
  ClipboardList, Star, CalendarOff, Users, 
  BarChart, Megaphone, Settings, FileText 
} from 'lucide-react-native';

// Auth Screens
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import OTPVerifyScreen from '../screens/auth/OTPVerifyScreen';

// Super Admin Screens
import SuperAdminDashboard from '../screens/super_admin/SuperAdminDashboard';
import AnalyticsDashboardScreen from '../screens/super_admin/AnalyticsDashboardScreen';
import UserManagementScreen from '../screens/super_admin/UserManagementScreen';
import LeaveApprovalsScreen from '../screens/super_admin/LeaveApprovalsScreen';
import SalaryExpensesScreen from '../screens/super_admin/SalaryExpensesScreen';
import NotificationCenterScreen from '../screens/super_admin/NotificationCenterScreen';
import PortalToolsScreen from '../screens/super_admin/PortalToolsScreen';

// Admin Staff Screens
import AdminStaffDashboard from '../screens/admin_staff/AdminStaffDashboard';
import FeeCollectionScreen from '../screens/admin_staff/FeeCollectionScreen';
import StudentPerformanceScreen from '../screens/admin_staff/StudentPerformanceScreen';
import ExamScheduleScreen from '../screens/admin_staff/ExamScheduleScreen';
import SubstitutionManagementScreen from '../screens/admin_staff/SubstitutionManagementScreen';
import TimetableBuilderScreen from '../screens/admin_staff/TimetableBuilderScreen';
import EnquiryLeadsScreen from '../screens/admin_staff/EnquiryLeadsScreen';

// Teacher Screens
import TeacherDashboard from '../screens/teachers/TeacherDashboard';
import AttendanceMarkingScreen from '../screens/teachers/AttendanceMarkingScreen';
import HomeworkAssignmentsScreen from '../screens/teachers/HomeworkAssignmentsScreen';
import MarksEntryScreen from '../screens/teachers/MarksEntryScreen';
import LeaveApplicationScreen from '../screens/teachers/LeaveApplicationScreen';
import DailyDiaryScreen from '../screens/teachers/DailyDiaryScreen';

// Parent Screens
import ParentDashboard from '../screens/parents/ParentDashboard';
import ReportCardScreen from '../screens/parents/ReportCardScreen';
import FeePaymentScreen from '../screens/parents/FeePaymentScreen';
import BusTrackingScreen from '../screens/parents/BusTrackingScreen';
import MessagingScreen from '../screens/parents/MessagingScreen';
import ProfileScreen from '../screens/parents/StudentProfileDetailsScreen';
import AttendanceHistoryScreen from '../screens/parents/AttendanceHistoryScreen';

// Guest Screens
import GuestDashboard from '../screens/guest/GuestDashboard';
import AdmissionsInfoScreen from '../screens/guest/AdmissionsInfoScreen';
import EnquiryFormScreen from '../screens/guest/EnquiryFormScreen';
import FacultyShowcaseScreen from '../screens/guest/FacultyShowcaseScreen';
import SchoolFacilitiesScreen from '../screens/guest/SchoolFacilitiesScreen';
import AchievementsGalleryScreen from '../screens/guest/AchievementsGalleryScreen';
import FeeStructureScreen from '../screens/guest/FeeStructureScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getTabOptions = (icon: any, activeColor: string, title?: string) => ({
  tabBarIcon: ({ color, size }: { color: string; size: number }) => {
    const IconComponent = icon;
    return <IconComponent size={size} color={color} />;
  },
  tabBarActiveTintColor: activeColor,
  headerShown: false,
  ...(title ? { title } : {}),
});

// Role-Specific Tab Navigators
const SuperAdminTabs = () => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ tabBarHideOnKeyboard: true }}>
    <Tab.Screen name="Dashboard" component={SuperAdminDashboard} options={getTabOptions(Home, '#f0c110')} />
    <Tab.Screen name="Analytics" component={AnalyticsDashboardScreen} options={getTabOptions(BarChart, '#f0c110')} />
    <Tab.Screen name="Users" component={UserManagementScreen} options={getTabOptions(Users, '#f0c110')} />
    <Tab.Screen name="Broadcast" component={NotificationCenterScreen} options={getTabOptions(Megaphone, '#f0c110')} />
    <Tab.Screen name="Settings" component={PortalToolsScreen} options={getTabOptions(Settings, '#f0c110')} />
  </Tab.Navigator>
);

const AdminStaffTabs = () => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ tabBarHideOnKeyboard: true }}>
    <Tab.Screen name="Dashboard" component={AdminStaffDashboard} options={getTabOptions(Home, '#46f1c5')} />
    <Tab.Screen name="Students" component={StudentPerformanceScreen} options={getTabOptions(Users, '#46f1c5')} />
    <Tab.Screen name="Fees" component={FeeCollectionScreen} options={getTabOptions(Banknote, '#46f1c5')} />
    <Tab.Screen name="Schedule" component={ExamScheduleScreen} options={getTabOptions(Calendar, '#46f1c5')} />
    <Tab.Screen name="Messages" component={MessagingScreen} options={getTabOptions(MessageCircle, '#46f1c5')} />
  </Tab.Navigator>
);

const TeacherTabs = () => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ tabBarHideOnKeyboard: true }}>
    <Tab.Screen name="Dashboard" component={TeacherDashboard} options={getTabOptions(Home, '#ddb7ff')} />
    <Tab.Screen name="Attendance" component={AttendanceMarkingScreen} options={getTabOptions(ClipboardCheck, '#ddb7ff')} />
    <Tab.Screen name="DailyDiary" component={DailyDiaryScreen} options={getTabOptions(FileText, '#ddb7ff', 'Daily Diary')} />
    <Tab.Screen name="Homework" component={HomeworkAssignmentsScreen} options={getTabOptions(ClipboardList, '#ddb7ff')} />
    <Tab.Screen name="Marks" component={MarksEntryScreen} options={getTabOptions(Star, '#ddb7ff')} />
    <Tab.Screen name="Leave" component={LeaveApplicationScreen} options={getTabOptions(CalendarOff, '#ddb7ff')} />
  </Tab.Navigator>
);

const ParentTabs = () => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ tabBarHideOnKeyboard: true }}>
    <Tab.Screen name="Dashboard" component={ParentDashboard} options={getTabOptions(Home, '#5E5CE6')} />
    <Tab.Screen name="Attendance" component={AttendanceHistoryScreen} options={getTabOptions(Calendar, '#5E5CE6')} />
    <Tab.Screen name="Academics" component={ReportCardScreen} options={getTabOptions(GraduationCap, '#10B981')} />
    <Tab.Screen name="Fees" component={FeePaymentScreen} options={getTabOptions(Banknote, '#10B981')} />
    <Tab.Screen name="Bus" component={BusTrackingScreen} options={getTabOptions(Bus, '#5E5CE6')} />
    <Tab.Screen name="Messages" component={MessagingScreen} options={getTabOptions(MessageCircle, '#5E5CE6')} />
  </Tab.Navigator>
);

const RoleStackComponent = () => {
  const { user } = useAuthStore();
  if (!user) return null;
  
  let initialRoute = "GuestHome";
  let mainComponent: React.ComponentType<any> = GuestDashboard;

  switch (user.role) {
    case 'super_admin':
      initialRoute = "SuperAdminHome";
      mainComponent = SuperAdminTabs;
      break;
    case 'admin_staff':
      initialRoute = "AdminStaffHome";
      mainComponent = AdminStaffTabs;
      break;
    case 'teacher':
      initialRoute = "TeacherHome";
      mainComponent = TeacherTabs;
      break;
    case 'parent':
      initialRoute = "ParentHome";
      mainComponent = ParentTabs;
      break;
    case 'guest':
      initialRoute = "GuestHome";
      mainComponent = GuestDashboard; // Using Guest Dashboard stack directly (no tabs)
      break;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <Stack.Screen name={initialRoute} component={mainComponent} />
      {/* Remaining Feature Screens */}
      <Stack.Screen name="FeePayment" component={FeePaymentScreen} />
      <Stack.Screen name="ReportCard" component={ReportCardScreen} />
      <Stack.Screen name="BusTracking" component={BusTrackingScreen} />
      <Stack.Screen name="Messaging" component={MessagingScreen} />
      <Stack.Screen name="TeacherCommunication" component={MessagingScreen} />
      <Stack.Screen name="EnquiryLeads" component={EnquiryLeadsScreen} />
      <Stack.Screen name="StudentPerformance" component={StudentPerformanceScreen} />
      <Stack.Screen name="SubstitutionManagement" component={SubstitutionManagementScreen} />
      <Stack.Screen name="LeaveApplication" component={LeaveApplicationScreen} />
      <Stack.Screen name="AnalyticsDashboard" component={AnalyticsDashboardScreen} />
      <Stack.Screen name="DailyDiary" component={DailyDiaryScreen} />
      <Stack.Screen name="HomeworkAssignments" component={HomeworkAssignmentsScreen} />
      <Stack.Screen name="AdmissionsInfo" component={AdmissionsInfoScreen} />
      <Stack.Screen name="AchievementsGallery" component={AchievementsGalleryScreen} />
      <Stack.Screen name="FeeCollection" component={FeeCollectionScreen} />
      <Stack.Screen name="FeeStructure" component={FeeStructureScreen} />
      <Stack.Screen name="EnquiryForm" component={EnquiryFormScreen} />
      <Stack.Screen name="TimetableBuilder" component={TimetableBuilderScreen} />
      <Stack.Screen name="SchoolFacilities" component={SchoolFacilitiesScreen} />
      <Stack.Screen name="AttendanceMarking" component={AttendanceMarkingScreen} />
      <Stack.Screen name="MarksEntry" component={MarksEntryScreen} />
      <Stack.Screen name="UserManagement" component={UserManagementScreen} />
      <Stack.Screen name="LeaveApprovals" component={LeaveApprovalsScreen} />
      <Stack.Screen name="ExamSchedule" component={ExamScheduleScreen} />
      <Stack.Screen name="SalaryExpenses" component={SalaryExpensesScreen} />
      <Stack.Screen name="PortalTools" component={PortalToolsScreen} />
      <Stack.Screen name="FacultyShowcase" component={FacultyShowcaseScreen} />
      <Stack.Screen name="AttendanceHistory" component={AttendanceHistoryScreen} />
      <Stack.Screen name="StudentProfileDetails" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="OTPVerify" component={OTPVerifyScreen} />
          </>
        ) : (
          <Stack.Screen name="AppHome" component={RoleStackComponent} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
