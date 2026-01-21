// import { rgb } from 'pdf-lib';

// export default {
//   page: {
//     size: [595.28, 841.89], // A4 size
//   },
//   margins: {
//     left: 45,
//     right: 45,
//   },
//   spacing: {
//     top: 50,
//     small: 12,
//     medium: 20,
//     large: 25,
//     xlarge: 30,
//   },
//   colors: {
//     textDark: rgb(0.1, 0.1, 0.1),
//     textLight: rgb(0.3, 0.3, 0.3),
//     border: rgb(0.7, 0.7, 0.7),
//     line: rgb(0.8, 0.8, 0.8),
//     highlight: rgb(0.95, 0.95, 1),
//   },
//   logo: {
//     x: 50,
//     width: 40,
//     height: 40,
//     offsetY: 20,
//     scale: 0.2,
//   },
//   box: {
//     height: 75,
//     container: (width) => ({
//       x: 45,
//       width: width - 90,
//       height: 75,
//       borderColor: rgb(0.7, 0.7, 0.7),
//       borderWidth: 1,
//     }),
//     netPay: (width, y) => ({
//       x: 45,
//       y: y - 25,
//       width: width - 90,
//       height: 25,
//       color: rgb(0.95, 0.95, 1),
//       borderColor: rgb(0.7, 0.7, 0.7),
//       borderWidth: 1,
//     }),
//   },
//   text: {
//     header: { x: 120, size: 18, color: rgb(0, 0, 0.6) },
//     subHeader: { x: 120, size: 9, color: rgb(0.3, 0.3, 0.3) },
//     title: { x: 50, size: 13, color: rgb(0.1, 0.1, 0.1) },
//     detail: { x: 60, size: 10.5, color: rgb(0, 0, 0) },
//     tableHeader: { x: 60, size: 12, color: rgb(0, 0, 0) },
//     tableHeaderRight: (width) => ({ x: width / 2 + 20, size: 12, color: rgb(0, 0, 0) }),
//     table: { x: 70, size: 10.5, color: rgb(0, 0, 0) },
//     tableRight: (width) => ({ x: width / 2 + 30, size: 10.5, color: rgb(0, 0, 0) }),
//     summary: { x: 60, size: 10.5, color: rgb(0, 0, 0) },
//     netPay: { x: 60, size: 12, color: rgb(0, 0.4, 0) },
//   },
// };
import { rgb } from 'pdf-lib';

export default {
  page: {
    size: [595.28, 841.89], // A4 size
  },
  margins: {
    left: 50,
    right: 50,
  },
  spacing: {
    top: 60,
    small: 10,
    medium: 18,
    large: 25,
  },
  colors: {
    textDark: rgb(0.1, 0.1, 0.1),
    textLight: rgb(0.4, 0.4, 0.4),
    border: rgb(0.7, 0.7, 0.7),
    line: rgb(0.85, 0.85, 0.85),
    highlight: rgb(0.95, 0.95, 1),
  },
};
