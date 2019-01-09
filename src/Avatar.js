import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes,
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import React from 'react';

import { DEFAULT_COLORS } from './constants/colors';
import UtilTypes from './constants/UtilTypes';

const iconPropTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  style: ViewPropTypes.style,
};

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
  utilType: PropTypes.oneOf(Object.values(UtilTypes)),

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
    name: 'pencil',
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  avatarContainer: {
    backgroundColor: DEFAULT_COLORS[5].toHexString(),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
  },
  icon: {
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  utilIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DEFAULT_COLORS[4].toHexString(),
    ...Platform.select({
      ios: {
        shadowColor: DEFAULT_COLORS[0].toHexString(),
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

const Avatar = ({
  avatarContainerProps,
  avatarContainerStyle,
  avatarContainerComponent,
  containerStyle,
  utilIcon,
  icon,
  imageStyle,
  indicator,
  rounded,
  utilType,
  size,
  source,
  title,
  emptyIcon,
}) => {
  const renderContent = () => {
    if (source) {
      const imageSizeStyle = { width: size, height: size };

      /*
      Note: imageRoundedStyle is a temp fix due to `overflow: hidden` not working on android:
      https://github.com/facebook/react-native/issues/3198
      */
      const imageRoundedStyle = { borderRadius: size / 2 };

      return (
        <Image
          source={source}
          style={[
            styles.image,
            imageSizeStyle,
            rounded && imageRoundedStyle,
            imageStyle,
          ]}
          resizeMode="cover"
        />
      );
    }
    if (icon.name) {
      const iconProps = { ...defaultProps.icon, ...icon };

      return (
        <Icon
          style={[styles.icon, iconProps.style]}
          name={iconProps.name}
          size={size * 0.8}
          color={iconProps.color}
        />
      );
    }
    if (title.text) {
      const titleProps = { ...defaultProps.title, ...title };
      const {
        text: titleText,
        color: titleColor,
        style: titleStyle,
      } = titleProps;
      const titleSizeStyle = { fontSize: size / 3 };
      const titleColorStyle = { color: titleColor };

      return (
        <Text style={[styles.title, titleSizeStyle, titleColorStyle, titleStyle]}>
          {titleText}
        </Text>
      );
    }
    // NOTE: when no content is provided.
    const {
      name: emptyIconName,
      size: emptyIconSize,
      color: emptyIconColor,
      style: emptyIconStyle,
    } = emptyIcon;

    return (
      <Icon
        style={[styles.icon, emptyIconStyle]}
        name={emptyIconName}
        size={emptyIconSize || size * 0.8}
        color={emptyIconColor}
      />
    );
  };

  const renderUtils = () => {
    switch (utilType) {
      case UtilTypes.ICON: {
        const utilIconProps = { ...defaultProps.utilIcon, ...utilIcon };
        const {
          onPress,
          name,
          color,
          underlayColor,
          style,
        } = utilIconProps;

        const utilIconDefaultSize = size / 3;
        const utilIconSize = utilIcon.size || utilIconDefaultSize;
        const utilIconSizeStyle = {
          width: utilIconSize,
          height: utilIconSize,
          borderRadius: utilIconSize / 2,
        };

        return (
          <TouchableHighlight
            style={[styles.utilIcon, utilIconSizeStyle, style]}
            underlayColor={underlayColor}
            onPress={onPress}
          >
            <View>
              <Icon
                size={utilIconSize * 0.7}
                name={name}
                color={color}
              />
            </View>
          </TouchableHighlight>
        );
      }
      case UtilTypes.INDICATOR: {
        const indicatorProps = { ...defaultProps.indicator, ...indicator };
        const {
          size: indicatorSizeProp,
          types,
          status,
          style,
        } = indicatorProps;

        const indicatorDefaultSize = size / 4;
        const indicatorSize = indicatorSizeProp || indicatorDefaultSize;
        const indicatorSizeStyle = {
          width: indicatorSize,
          height: indicatorSize,
          borderRadius: indicatorSize / 2,
        };
        const statusColorStyle = {
          backgroundColor: _.find(types, { key: status }).color,
        };

        return (
          <View style={[styles.indicator, indicatorSizeStyle, statusColorStyle, style]} />
        );
      }
      case UtilTypes.NONE:
      default: {
        return null;
      }
    }
  };

  const ContentContainerComponent = avatarContainerComponent;
  const avatarSizeStyle = { width: size, height: size };
  const avatarRoundedStyle = { borderRadius: size / 2 };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* This layer of View is for container to alignItems: flex-start */}
      <View>
        <ContentContainerComponent
          style={[
            styles.avatarContainer,
            avatarSizeStyle,
            rounded && avatarRoundedStyle,
            avatarContainerStyle,
          ]}
          {...avatarContainerProps}
        >
          {renderContent()}
        </ContentContainerComponent>
        {renderUtils()}
      </View>
    </View>
  );
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
