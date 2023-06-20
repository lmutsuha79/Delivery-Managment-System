import OrderStatusTag from "@/components/orders/order-status-tag";
import {
  faCheck,
  faDollar,
  faMotorcycle,
  faPhone,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "primereact/avatar";
import { OrderList } from "primereact/orderlist";
import { useEffect, useState } from "react";

const currentSession = ({data}) => {
      console.log(data)
  return (
    <div className="grid">
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                Total revenue for this session
              </span>
              <div className="text-900 font-medium text-xl">
                {"2.100" + " " + "DA"}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-orange-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <FontAwesomeIcon icon={faDollar} className="text-red-300" />
            </div>
          </div>
          {/* <span className="text-green-500 font-medium">%52+ </span>
          <span className="text-500">since last week</span> */}
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                Orders for this session
              </span>
              <div className="text-900 font-medium text-xl">152 Orders</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-blue-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-shopping-cart text-blue-500 text-xl" />
            </div>
          </div>
          {/* <span className="text-green-500 font-medium">24 new </span>
          <span className="text-500">since last visit</span> */}
        </div>
      </div>

      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                Delivered orders in this session
              </span>
              <div className="text-900 font-medium text-xl">28441 Orders</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-cyan-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <FontAwesomeIcon icon={faCheck} className="text-cyan-500" />
            </div>
          </div>
          {/* <span className="text-green-500 font-medium">520 Order</span> */}
          {/* <span className="text-500">Order</span> */}
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                canceled orders in this session
              </span>
              <div className="text-900 font-medium text-xl">152 Orders</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-purple-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <FontAwesomeIcon icon={faXmark} className="text-purple-500" />
            </div>
          </div>
          {/* <span className="text-green-500 font-medium">85 </span> */}
        </div>
      </div>

      <div className="col-12 xl:col-6">
        <div className="card ">
          <h5>Recent Orders</h5>
          <div>
            <ul className="">
              <li className="transform hover:scale-105 transition-transform flex items-center justify-between px-2 py-3 rounded-md shadow-sm border card mb-3">
                <div>
                  <span className="font-bold text-xl mr-3">#21</span>
                  <span className="font-medium text-lg">
                    079408289 <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <div>
                    <span className="mr-2 font-medium text-primary_color">
                      taken by:
                    </span>
                    <span>
                      Khelil Yasser <FontAwesomeIcon icon={faMotorcycle} />
                    </span>
                  </div>
                </div>
                <div>
                  <OrderStatusTag orderText={"delivered"} />
                </div>
              </li>
              <li className="transform hover:scale-105 transition-transform flex items-center justify-between px-2 py-3 rounded-md shadow-sm border card mb-3">
                <div>
                  <span className="font-bold text-xl mr-3">#21</span>
                  <span className="font-medium text-lg">
                    079408289 <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <div>
                    <span className="mr-2 font-medium text-primary_color">
                      taken by:
                    </span>
                    <span>
                      Khelil Yasser <FontAwesomeIcon icon={faMotorcycle} />
                    </span>
                  </div>
                </div>
                <div>
                  <OrderStatusTag orderText={"delivered"} />
                </div>
              </li>
              <li className="transform hover:scale-105 transition-transform flex items-center justify-between px-2 py-3 rounded-md shadow-sm border card mb-3">
                <div>
                  <span className="font-bold text-xl mr-3">#21</span>
                  <span className="font-medium text-lg">
                    079408289 <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <div>
                    <span className="mr-2 font-medium text-primary_color">
                      taken by:
                    </span>
                    <span>
                      Khelil Yasser <FontAwesomeIcon icon={faMotorcycle} />
                    </span>
                  </div>
                </div>
                <div>
                  <OrderStatusTag orderText={"delivered"} />
                </div>
              </li>
              <li className="transform hover:scale-105 transition-transform flex items-center justify-between px-2 py-3 rounded-md shadow-sm border card mb-3">
                <div>
                  <span className="font-bold text-xl mr-3">#21</span>
                  <span className="font-medium text-lg">
                    079408289 <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <div>
                    <span className="mr-2 font-medium text-primary_color">
                      taken by:
                    </span>
                    <span>
                      Khelil Yasser <FontAwesomeIcon icon={faMotorcycle} />
                    </span>
                  </div>
                </div>
                <div>
                  <OrderStatusTag orderText={"delivered"} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-12 xl:col-6">
        <div className="card ">
          <h5>Active Delivery Boys</h5>
          <ul>
            <li className="transform hover:scale-105 transition-transform flex items-center  px-2 py-3 rounded-md shadow-sm border card mb-3">
              <Avatar
                image="/images/delivery-boys-avatars/yasser.png"
                size="large"
                shape="circle"
              />
              <span className="font-medium ml-2">Khelil Yasser</span>
            </li>
            <li className="transform hover:scale-105 transition-transform flex items-center  px-2 py-3 rounded-md shadow-sm border card mb-3">
              <Avatar
                image="/images/delivery-boys-avatars/yasser.png"
                size="large"
                shape="circle"
              />
              <span className="font-medium ml-2">Khelil Yasser</span>
            </li>
            <li className="transform hover:scale-105 transition-transform flex items-center  px-2 py-3 rounded-md shadow-sm border card mb-3">
              <Avatar
                image="/images/delivery-boys-avatars/yasser.png"
                size="large"
                shape="circle"
              />
              <span className="font-medium ml-2">Khelil Yasser</span>
            </li>
            <li className="transform hover:scale-105 transition-transform flex items-center  px-2 py-3 rounded-md shadow-sm border card mb-3">
              <Avatar
                image="/images/delivery-boys-avatars/yasser.png"
                size="large"
                shape="circle"
              />
              <span className="font-medium ml-2">Khelil Yasser</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const data = "serverSidePro";
  

  return {
    props: {
      data,
    },
  };
}
export default currentSession;
