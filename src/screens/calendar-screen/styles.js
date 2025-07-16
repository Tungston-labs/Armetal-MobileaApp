// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1A3C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
    backgroundColor: '#262D40',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 12,
    marginTop:20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#132259',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  greenStrip: {
    width: 4,
    backgroundColor: '#2ECC71',
    borderRadius: 4,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleText: {
    color: '#B0BEC5',
    marginVertical: 2,
  },
  dateRange: {
    color: '#B0BEC5',
    fontSize: 12,
    marginTop: 4,
  },
  
  tabIconActive: {
    backgroundColor: '#1E3A8A',
    padding: 8,
    borderRadius: 20,
  },
});
