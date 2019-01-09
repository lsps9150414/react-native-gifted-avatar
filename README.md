# react-native-ui-toolbox
Cross platform React Native avatar UI component with built-in common features:

- edit button
- status indicator
- badge

## Installation

Inside your project:
```bash
npm install react-native-gifted-avatar --save
```

## Demo
![demo screenshot]()
![demo link QR code]()

## Change logs

## Road Map

## API

### Prop Types
```javascript
const propTypes = {
  /* ===== CONFIGS ===== */
  size: PropTypes.number,
  rounded: PropTypes.bool,
  containerStyle: ViewPropTypes.style,

  avatarContainerComponent: PropTypes.oneOf([
    View,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
  ]),
  avatarContainerProps: PropTypes.object,
  avatarContainerStyle: ViewPropTypes.style,

  /* ===== AVATAR CONTENT ===== */
  source: Image.propTypes.source,
  imageStyle: Image.propTypes.style,

  title: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
    style: Text.propTypes.style,
  }),

  icon: PropTypes.shape({
    ...iconPropTypes,
  }),

  emptyIcon: PropTypes.shape({
    ...iconPropTypes,
  }),

  /* ===== UTIL ===== */
  utilType: PropTypes.oneOf([Object.values(UtilTypes)]),

  utilIcon: PropTypes.shape({
    ...iconPropTypes,
    onPress: PropTypes.func,
    underlayColor: PropTypes.string,
  }),

  indicator: PropTypes.shape({
    size: PropTypes.number,
    status: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      color: PropTypes.string,
    })),
    style: ViewPropTypes.style,
  }),
};

const defaultProps = {
  size: 100,
  rounded: false,
  containerStyle: null,

  avatarContainerComponent: View,
  avatarContainerProps: {},
  avatarContainerStyle: null,

  source: null,
  imageStyle: null,
  title: {
    color: DEFAULT_COLORS[3].toHexString(),
  },
  icon: {
    color: '#fff',
  },
  emptyIcon: {
    color: '#fff',
  },

  utilType: UtilTypes.NONE,
  utilIcon: {
    name: 'mode-edit',
    color: '#fff',
    underlayColor: DEFAULT_COLORS[0].toHexString(),
  },
  indicator: {
    types: [
      { key: 'active', color: 'lightgreen' },
      { key: 'inactive', color: 'tomato' },
    ],
    status: 'active',
  },
};
```