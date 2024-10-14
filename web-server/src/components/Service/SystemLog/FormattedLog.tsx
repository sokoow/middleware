import { useTheme } from '@mui/material';
import { useCallback } from 'react';

import { Line } from '@/components/Text';
import { ParsedLog } from '@/constants/log-formatter';

export const FormattedLog = ({
  log,
  index
}: {
  log: ParsedLog;
  index: number;
}) => {
  const theme = useTheme();
  const getLevelColor = useCallback(
    (level: string) => {
      const colors: { [key: string]: string } = {
        INFO: theme.colors.success.main,
        MAIN_INFO: theme.colors.success.main,
        CHILD_INFO: theme.colors.success.main,
        SENTINEL_INFO: theme.colors.success.main,
        WARN: theme.colors.warning.main,
        WARNING: theme.colors.warning.main,
        NOTICE: theme.colors.warning.dark,
        ERROR: theme.colors.error.main,
        FATAL: theme.colors.error.main,
        PANIC: theme.colors.error.main,
        DEBUG: theme.colors.info.light,
        MAIN_SYSTEM: theme.colors.primary.main,
        CHILD_SYSTEM: theme.colors.primary.main,
        SENTINEL_SYSTEM: theme.colors.primary.main,
        LOG: theme.colors.info.main,
        CRITICAL: theme.colors.error.main
      };

      return colors[level.toUpperCase()] || theme.colors.info.main;
    },
    [theme]
  );

  const { timestamp, ip, logLevel, message } = log;
  return (
    <Line
      key={index}
      marginBottom={'8px'}
      fontSize={'14px'}
      fontFamily={'monospace'}
    >
      <Line component="span" color="info.main">
        {timestamp}
      </Line>{' '}
      {ip && (
        <Line component="span" color="primary.main">
          {ip}{' '}
        </Line>
      )}
      <Line component="span" color={getLevelColor(logLevel)}>
        [{logLevel}]
      </Line>{' '}
      {message}
    </Line>
  );
};
