import { FC, ReactElement, ReactNode } from 'react';

import {
  Stack,
  styled,
  Tab as MuiTab,
  TabProps as MuiTabProps,
  Box,
  Typography,
} from '@mui/material';

const DefaultTab = styled(MuiTab)(({ theme }) => ({
  alignItems: 'flex-start',
  padding: 0,
  borderBottom: `1px solid ${theme.palette.button['content-disabled']}`,
  '& .TabHead': {
    textTransform: 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing(3)} ${theme.spacing(5)}`,
    height: '100%',
    justifyContent: 'flex-end',
    '& .TabHead-toptag': {
      display: 'flex',
      justifyContent: 'right',
    },
    '& .TabHead-avatar': {
      display: 'flex',
      justifyContent: 'center',
    },
    '& .TabHead-container': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .TabHead-icon': {
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(3),
      },
      '& .TabHead-inline-tag': {
        marginLeft: theme.spacing(5),
      },
    },
  },
}));

type TabHeadProps = {
  text: string;
  icon?: ReactNode;
  tag?: ReactNode;
  topTag?: ReactNode;
  avatar?: ReactNode;
};

export type TabProps = {
  index: number;
} & TabHeadProps &
  Pick<
    MuiTabProps,
    | 'children'
    | 'role'
    | 'sx'
    | 'className'
    | 'id'
    | 'aria-controls'
    | 'disabled'
    | 'onClick'
  >;
const TabHead: FC<TabHeadProps & { id: string }> = ({
  id,
  icon,
  text,
  tag,
  topTag,
  avatar,
  ...props
}): ReactElement => (
  <Box {...props} className={`TabHead`}>
    {topTag && <Box className={`TabHead-toptag`}>{topTag}</Box>}
    {avatar && <Box className={`TabHead-avatar`}>{avatar}</Box>}
    <Box className={`TabHead-container`}>
      <Box className={`TabHead-icon`}>{icon}</Box>
      <Typography className={`TabHead-text`} id={`${id}__label`}>
        {text}
      </Typography>
      <Box className={`TabHead-inline-tag`}>{tag}</Box>
    </Box>
  </Box>
);

const Tab: FC<TabProps> = ({
  index,
  className = '',
  icon,
  text,
  tag,
  topTag,
  avatar,
  disabled,
  ...props
}) => {
  const id = props['id'] ?? `mdk-tab-${index}`;
  const ariaControl = props['aria-controls'] ?? `tab-control-${index}`;

  const disabledClass = disabled ? 'TabBase-disabled' : '';
  return (
    <DefaultTab
      {...props}
      id={id}
      disabled={disabled}
      aria-labelledby={`${id}__label`}
      aria-controls={ariaControl}
      aria-disabled={disabled}
      className={`TabBase ${disabledClass} ${className}`}
      label={
        <TabHead
          id={id}
          icon={icon}
          text={text}
          tag={tag}
          topTag={topTag}
          avatar={avatar}
        />
      }
    />
  );
};

const StyledTab = styled(Tab)<
  Pick<FiltersProps, 'isCompact'> & { hasLabel: boolean }
>(({ theme, isCompact, hasLabel }) => ({
  textTransform: 'none',
  height: 'fit-content',
  minWidth: 0,
  minHeight: 0,
  maxWidth: '100%',
  width: 'fit-content',
  alignItems: 'center',
  border: `1px solid ${theme.palette.neutral[60]}`,
  borderRadius: '72px',
  backgroundColor: 'none',
  opacity: '1',
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['background-color', 'border-color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: theme.palette.brand[60],
    borderColor: theme.palette.brand[60],
  },

  '& .TabHead-icon .MuiSvgIcon-root': {
    marginRight: !hasLabel ? 0 : theme.spacing(isCompact ? 2 : 3),
  },

  '&.Mui-selected': {
    backgroundColor: theme.palette.brand[100],
    borderColor: theme.palette.brand[100],
  },

  '&.TabBase-disabled': {
    opacity: '0.5',

    '& .TabHead-text': {
      color: theme.palette.form['content-disabled'],
    },
  },

  '& .TabHead': {
    textTransform: 'none',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    padding: isCompact ? theme.spacing(3, 4) : theme.spacing(4, 5),

    '& .TabHead-container .TabHead-icon': {
      marginRight: '0',
    },
  },

  '& .TabHead-text': {
    ...theme.typography[isCompact ? 'body-sm' : 'body-md'],
  },

  '& .TabHead-inline-tag': {
    display: 'none',
  },
}));

export type FilterItemProps = {
  value: string | number;
  label?: string;
  active?: boolean;
  disabled?: boolean;
  icon?: ReactElement;
};

export type FiltersProps = {
  items: FilterItemProps[];
  isCompact?: boolean;
  'data-testid'?: string;
  onChange: (value: string | number) => void;
};

const Filters = ({
  isCompact,
  items,
  ['data-testid']: dataTestId = 'investments-segmented-control',
  onChange,
}: FiltersProps) => {
  return (
    <Stack
      data-testid={dataTestId}
      direction="row"
      spacing={3}
      gap={3}
      sx={{
        maxWidth: '100%',
        flexWrap: 'wrap',
      }}
    >
      {items.map((item, index) => (
        <Stack
          key={item.value}
          margin="0 !important"
          sx={{ cursor: item.disabled ? 'not-allowed' : 'pointer' }}
        >
          <StyledTab
            index={index}
            isCompact={isCompact}
            hasLabel={Boolean(item.label)}
            icon={item.icon}
            text={item.label ?? ''}
            disabled={item.disabled}
            className={item.active ? 'Mui-selected' : ''}
            onClick={() => onChange(item.value)}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export { Filters };
