import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../styles/theme';

interface InputProps extends TextInputProps {
  icon?: React.ReactNode;
}

export default function Input({ icon, style, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <TextInput
        style={[styles.input, icon ? styles.inputWithIcon : undefined, style]}
        placeholderTextColor={theme.colors.textSecondary} // AlmaSense: #A0B5C0
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    minHeight: 48,
  },
  inputWithIcon: {
    paddingLeft: theme.spacing['3xl'],
  },
  iconContainer: {
    position: 'absolute',
    left: theme.spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
});
