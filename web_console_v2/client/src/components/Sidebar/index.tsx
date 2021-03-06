import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { useToggle } from 'react-use'
import { FlexAlignCenter, Square } from 'styles/mixins'
import classNames from 'classnames'

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 200px;
  padding: 16px 8px 8px;
  background-color: white;

  &.isFolded {
    width: 48px;
    padding: 16px 4px 8px;
    align-items: center;

    .ant-menu-item {
      padding-left: 0 !important;
      padding-right: 0;
      text-align: center;

      .anticon {
        margin-right: 0;
      }
    }
  }
`

const FoldButton = styled.div`
  ${Square(24)}
  ${FlexAlignCenter()}

  display: inline-flex;
  background-color: var(--gray1);
  color: var(--gray6);
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: var(--gray2);
  }
`

const SIDEBAR_MENU_ITEMS = [
  {
    to: '/projects',
    label: 'menu_label_project',
    icon: MailOutlined,
  },
  {
    to: '/workflows',
    label: 'menu_label_workflow',
    icon: AppstoreOutlined,
  },
  {
    to: '/datasets',
    label: 'menu_label_datasets',
    icon: SettingOutlined,
  },
]

const defaultActivePath = SIDEBAR_MENU_ITEMS[0].to

function Sidebar({ className }: StyledComponetProps) {
  const { t } = useTranslation()
  const [isFolded, toggleFold] = useToggle(false)

  return (
    <Container className={classNames(className, { isFolded })}>
      <Menu mode="inline" defaultSelectedKeys={[defaultActivePath]}>
        {SIDEBAR_MENU_ITEMS.map((menu) => (
          <Menu.Item key={menu.to}>
            {isFolded ? (
              <Tooltip title={t(menu.label)} placement="right">
                <Link to={menu.to}>
                  <menu.icon />
                </Link>
              </Tooltip>
            ) : (
              <>
                <menu.icon />
                <Link to={menu.to}>{t(menu.label)}</Link>
              </>
            )}
          </Menu.Item>
        ))}
      </Menu>

      <FoldButton onClick={toggleFold}>
        {isFolded ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </FoldButton>
    </Container>
  )
}

export default Sidebar
