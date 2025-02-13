import React from 'react';
import { PopoverProps } from '@mantine/core';
import { IMessage, IMessageAction, ButtonTypeEnum } from '@novu/shared';

import { NotificationCenter } from '../notification-center';
import { INotificationBellProps } from '../notification-bell';
import { Popover } from './components/Popover';
import { useNotifications } from '../../hooks';
import { ColorScheme, INovuThemePopoverProvider } from '../../index';
import { ITab, ListItem } from '../../shared/interfaces';
import { getDefaultTheme } from '../../utils/defaultTheme';

export interface IPopoverNotificationCenterProps {
  onUrlChange?: (url: string) => void;
  onNotificationClick?: (notification: IMessage) => void;
  onUnseenCountChanged?: (unseenCount: number) => void;
  children: (props: INotificationBellProps) => JSX.Element;
  header?: () => JSX.Element;
  footer?: () => JSX.Element;
  emptyState?: () => JSX.Element;
  listItem?: ListItem;
  colorScheme: ColorScheme;
  theme?: INovuThemePopoverProvider;
  onActionClick?: (templateIdentifier: string, type: ButtonTypeEnum, message: IMessage) => void;
  actionsResultBlock?: (templateIdentifier: string, messageAction: IMessageAction) => JSX.Element;
  tabs?: ITab[];
  showUserPreferences?: boolean;
  onTabClick?: (tab: ITab) => void;
  offset?: number;
  position?: PopoverProps['position'];
}

export function PopoverNotificationCenter({ children, ...props }: IPopoverNotificationCenterProps) {
  const { theme } = getDefaultTheme({ colorScheme: props.colorScheme, theme: props.theme });
  const { unseenCount } = useNotifications();

  return (
    <Popover
      theme={theme}
      bell={(bellProps) => children({ ...bellProps, unseenCount, theme })}
      position={props.position}
      offset={props.offset}
    >
      <NotificationCenter
        onNotificationClick={props.onNotificationClick}
        onUrlChange={props.onUrlChange}
        header={props.header}
        footer={props.footer}
        colorScheme={props.colorScheme}
        theme={props.theme}
        emptyState={props.emptyState}
        onActionClick={props.onActionClick}
        actionsResultBlock={props.actionsResultBlock}
        listItem={props.listItem}
        tabs={props.tabs}
        showUserPreferences={props.showUserPreferences}
        onTabClick={props.onTabClick}
        onUnseenCountChanged={props.onUnseenCountChanged}
      />
    </Popover>
  );
}
