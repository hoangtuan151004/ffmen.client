"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Image from "next/image"

const components: { title: string; href: string; image: string; description: string }[] = [
  {
    title: 'Button',
    href: '/docs/components/button',
    description: 'Click me!',
    image: '/avatars/01.png',
  },
  {
    title: 'Card',
    href: '/docs/components/card',
    description: 'Info box component',
    image: '/avatars/02.png',
  },
  {
    title: 'Input',
    href: '/docs/components/input',
    description: 'Text input component',
    image: '/avatars/03.png',
  },
  {
    title: 'Checkbox',
    href: '/docs/components/checkbox',
    description: 'Checkbox component',
    image: '/avatars/04.png',
  },
  {
    title: 'Radio',
    href: '/docs/components/radio',
    description: 'Radio button component',
    image: '/avatars/05.png',
  },
  {
    title: 'Switch',
    href: '/docs/components/switch',
    description: 'Toggle switch component',
    image: '/avatars/03.png', // dùng lại ảnh khác nếu bạn chưa có ảnh mới
  },
]


export function SiteNavBar() {
  const [hovered, setHovered] = React.useState(components[0])
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className="px-4 py-2">
            <Link href="/docs">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Category</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] gap-2 md:grid-cols-3 p-3">
              <li className="col-span-2 grid grid-cols-2 gap-4">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    onMouseEnter={() => setHovered(component)}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </li>
              <li className="col-span-1">
                <NavigationMenuLink
                  className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none select-none focus:shadow-md"
                  href={hovered?.href || '/'}
                >
                  <Image
                    src={hovered?.image}
                    alt={hovered?.title}
                    className="mb-4 h-32 w-full object-cover rounded-md"
                    width={100}
                    height={100}
                  />
                  <div className="mb-1 text-lg font-medium">
                    {hovered?.title}
                  </div>
                  <p className="text-sm text-muted-foreground leading-tight">
                    {hovered?.description}
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className="px-4 py-2">
            <Link href="/docs">Docs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
