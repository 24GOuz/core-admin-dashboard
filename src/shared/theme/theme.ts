import {
  Button,
  createTheme,
  FileInput,
  Modal,
  MultiSelect,
  NumberInput,
  PasswordInput,
  rem,
  Select,
  Tabs,
  TextInput,
} from '@mantine/core';
import { DateInput, DateTimePicker, YearPickerInput } from '@mantine/dates';
import buttonClasses from './button.module.css';
import inputClasses from './input.module.css';
import selectClasses from './select.module.css';
import tabsClasses from './tabs.module.css';

export const theme = createTheme({
  // fontFamily: 'Inter, san serif',
  breakpoints: {
    xs: '0', // 0px
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '64em', // 1024px
    xl: '80em', // 1280px
  },
  colors: {
    primary: [
      '#EEF2FF', // 0
      '#E0E7FF', // 100
      '#C7D2FE', // 200
      '#A5B4FC', // 300
      '#818CF8', // 400
      '#6366F1', // 500
      '#4F46E5', // main 600
      '#4338CA', // 700
      '#3730A3', // 800
      '#312E81', // 900
    ],
    neutral: [
      '#F8FAFC', // 0
      '#F1F5F9', // 100
      '#E2E8F0', // 200
      '#CBD5E1', // 300
      '#94A3B8', // 400
      '#64748B', // 500
      '#475569', // 600
      '#334155', // 700
      '#1E293B', // 800
      '#0F172A', // 900
    ],
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        radius: '8px',
        fw: 600,
        fz: 16,
      },
      classNames: buttonClasses,
      vars: (_, props) => {
        if (props.size === 'small') {
          return {
            root: {
              '--button-height': '36px',
              '--button-padding-x': rem(12),
            },
          };
        }
        if (props.size === 'medium') {
          return {
            root: {
              '--button-height': '44px',
              '--button-padding-x': rem(16),
            },
          };
        }

        if (props.size === 'big') {
          return {
            root: {
              '--button-height': '56px',
              '--button-padding-x': rem(16),
            },
          };
        }

        return { root: {} };
      },
    }),
    ActionIcon: Button.extend({
      defaultProps: {
        radius: '8px',
        fw: 600,
      },
      classNames: buttonClasses,
      vars: (_, props) => {
        if (props.size === 'sm') {
          return {
            root: {
              '--button-height': '36px',
              '--button-padding-x': rem(12),
            },
          };
        }
        if (props.size === 'md') {
          return {
            root: {
              '--button-height': '44px',
              '--button-padding-x': rem(16),
            },
          };
        }

        if (props.size === 'lg') {
          return {
            root: {
              '--button-height': '56px',
              '--button-padding-x': rem(16),
            },
          };
        }

        return { root: {} };
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        radius: '8px',
      },
      classNames: {
        wrapper: inputClasses.wrapper,
        input: inputClasses.input,
        error: inputClasses.error,
        label: inputClasses.label,
      },
      styles: {
        label: {
          fontWeight: 600,
        },
      },
    }),
    YearPickerInput: YearPickerInput.extend({
      defaultProps: {
        radius: '8px',
        size: 'md',
      },
      styles: {
        label: {
          fontSize: 14,
          fontWeight: 600,
          lineHeight: '20px',
          color: 'var(--mantine-color-neutral-6)',
        },
        input: {
          height: 44,
          fontSize: 16,
          padding: '0 10px',
        },
        error: {
          fontSize: 12,
        },
      },
    }),
    Tabs: Tabs.extend({
      classNames: {
        tab: tabsClasses.tab,
        list: tabsClasses.list,
      },
    }),
    Select: Select.extend({
      defaultProps: {
        radius: '8px',
        size: 'md',
      },
      classNames: {
        wrapper: selectClasses.wrapper,
        input: selectClasses.input,
        error: selectClasses.error,
        label: selectClasses.label,
      },
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        radius: '8px',
        size: 'md',
      },

      styles: {
        input: {
          height: '44px',
          padding: '0 10px',
        },
        wrapper: {
          height: '44px',
        },
        label: {
          fontSize: 14,
          fontWeight: 600,
          lineHeight: '20px',
          color: 'var(--mantine-color-neutral-6)',
        },
      },
    }),
    MultiSelect: MultiSelect.extend({
      defaultProps: {
        radius: '8px',
        size: 'md',
      },
      classNames: {
        wrapper: selectClasses.wrapper,
        input: selectClasses.input,
        error: selectClasses.error,
        label: selectClasses.label,
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        radius: '8px',
        size: 'md',
      },
      classNames: {
        wrapper: inputClasses.wrapper,
        input: inputClasses.input,
        error: inputClasses.error,
        label: inputClasses.label,
      },
    }),
    DateInput: DateInput.extend({
      defaultProps: {
        radius: '8px',
        size: 'md',
      },
      styles: {
        label: {
          fontSize: 14,
          fontWeight: 600,
          lineHeight: '20px',
          color: 'var(--mantine-color-neutral-6)',
        },
        input: {
          height: 44,
          fontSize: 16,
          padding: '0 10px',
        },
        error: {
          fontSize: 12,
        },
      },
    }),
    FileInput: FileInput.extend({
      defaultProps: {
        radius: '8px',
        size: 'md',
      },
      styles: {
        label: {
          fontSize: 14,
          fontWeight: 600,
          lineHeight: '20px',
          color: 'var(--mantine-color-neutral-6)',
        },
        input: {
          height: 44,
          fontSize: 16,
          padding: '0 10px',
        },
        error: {
          fontSize: 12,
        },
      },
    }),
    DateTimePicker: DateTimePicker.extend({
      defaultProps: {
        radius: '8px',
        size: 'md',
      },
      styles: {
        label: {
          fontSize: 14,
          fontWeight: 600,
          lineHeight: '20px',
          color: 'var(--mantine-color-neutral-6)',
        },
        input: {
          height: 44,
          fontSize: 16,
          padding: '0 10px',
        },
        error: {
          fontSize: 12,
        },
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        radius: '20px',
      },
      styles: {
        title: {
          fontSize: '20px',
          fontWeight: '600',
          fontStyle: 'normal',
          lineHeight: '28px',
          color: 'var(--mantine-color-neutral-8)',
        },
        header: {
          padding: '12px 12px 12px 32px',
        },
      },
    }),
  },
});
