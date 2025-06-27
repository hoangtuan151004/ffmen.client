"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import logo from "@/assets/logo.jpg"
import Image from "next/image"
import { SiteNavBar } from "./site-navbar"

export function MainNav() {

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Image src={logo} alt="Logo" width={50} height={50} className="rounded-full" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
    <SiteNavBar />
    </div>
  )
}
