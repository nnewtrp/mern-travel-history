import { AppBar, Button, Divider, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MenuDropdownIcon from "./MenuDropDownIcon";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function NavBar() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const menuList = [
    { title: 'Home', path: '/' },
    { title: 'Add Trip', path: '/manage' },
  ]

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuOnClick = (path: string) => {
    navigate(path)
    handleClose()
  }


  return (
    <AppBar sx={{ width: '100%' }}>
      <Toolbar>
        <Typography variant="h6">Travel History</Typography>
        <div style={{ flexGrow: 1 }} />
        
        {/* Menu Drop Down */}
        <Button variant="text" onClick={handleMenu} sx={{ color: "white", fontWeight: "bold" }}>
          Menu <MenuDropdownIcon isRotate={!!anchorEl} />
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{ mt: "35px" }}
          open={!!anchorEl}
          onClose={handleClose}
        >
          {menuList.map((menu) => (
            <div key={menu.title}>
              <MenuItem onClick={() => handleMenuOnClick(menu.path)} sx={{ fontWeight: "bold" }}>
                {menu.title}
              </MenuItem>
              <Divider />
            </div>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}