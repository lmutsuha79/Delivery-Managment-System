import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import Link from "next/link";
import SessionStatus from "@/components/session-status";
import { SessionContext } from "@/pages/_app";

const AppMenu = () => {
  const { currentSession, setCurrentSession } = useContext(SessionContext);
  const { layoutConfig } = useContext(LayoutContext);

  const model = [
    {
      label: "Home",

      items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }],
    },
    {
      label: "Delivery Boys Managment",
      items: [
        {
          label: "delivery boys",
          icon: "pi pi-fw pi-list",
          to: "/delivery-boys",
        },
        {
          label: "Input",
          icon: "pi pi-fw pi-check-square",
          to: "/uikit/input",
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        <div key={9999}>
          <SessionStatus />
        </div>
        {[
          ...model.map((item, i) => {
            return !item.seperator ? (
              <AppMenuitem item={item} root={true} index={i} key={item.label} />
            ) : (
              <li className="menu-separator"></li>
            );
          }),
          <div key={"jiill"}>
            <li className="menu-separator"></li>
            {!currentSession.status ? (
              <div key={"jijijiji"}>
                <h3 className="text-base font-semibold">Current Session Managment</h3>
                <p className="text-red-500">no active session try to start one</p>
              </div>
            ) : (
              <AppMenuitem
                item={{
                  label: "Current session Managment",
                  items: [
                    { label: "overview", to: "/currentSession" },
                    {
                      label: "Delivery Boys Attendance",
                      to: "/currentSession/boysAttendance",
                    },
                    { label: "orders", to: "/currentSession/orders" },
                  ],
                }}
                root={true}
                index={999}
                key={"Current session"}
              />
            )}
          </div>,
        ]}

        {/* <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}> */}
        {/* <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} /> */}

        {/* <h2 className='text-black text-lgs'>Alo Khayi Logo</h2> */}
        {/* </Link> */}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
