"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Container from "../Container";
import CategoryBox from "../CategoryBox";

import { TbCar, TbPool } from "react-icons/tb";
import { GiGamepad } from "react-icons/gi"
import { MdPets, MdFamilyRestroom } from "react-icons/Md";
import { CgInsights } from "react-icons/Cg";
import { CiMountain1 } from "react-icons/ci";
import { BsFillPeopleFill, BsWifi } from "react-icons/bs";
import { RiNetflixFill } from "react-icons/ri";

export const categories = [
  {
    label: "Parking",
    icon: TbCar,
    description: "This property has a dedicated parking space"
  },
  {
    label: "Pets OK",
    icon: MdPets,
    description: "This property allows pets"
  },
  {
    label: "City view",
    icon: CgInsights,
    description: "This property has a view of the city"
  },
  {
    label: "Pool",
    icon: TbPool,
    description: "You will have free access to the pool"
  },
  {
    label: "Playstation",
    icon: GiGamepad,
    description: "You will have free access to the pool"
  },
  {
    label: "Mountain view",
    icon: CiMountain1,
    description: "This unit has a mountain view"
  },
  {
    label: "Family",
    icon: MdFamilyRestroom,
    description: "This unit is good for family booking up to 4"
  },
  {
    label: "Couple",
    icon: BsFillPeopleFill,
    description: "This unit is perfect for couples"
  },
  {
    label: "Netflix",
    icon: RiNetflixFill,
    description: "This unit has free Netflix"
  },
  {
    label: "Wifi",
    icon: BsWifi,
    description: "This unit has free Wifi"
  },
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage)
  {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category=== item.label}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories