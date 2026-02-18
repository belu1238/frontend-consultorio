import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";


type FolderDropdownProps =  {
    folder:  {
    id: number;
    nombre: string;
}
}

export default function FolderDropdown({ folder } : FolderDropdownProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center p-1 rounded hover:bg-gray-200">
        <HiEllipsisHorizontal className="w-6 h-6 text-gray-600 hover:text-black" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md
                     bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          {/* Editar */}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => navigate(location.pathname + `?editFolder=${folder.id}`)}
                className={`${
                  active ? "bg-gray-100" : ""
                } w-full text-left px-4 py-2 flex items-center gap-2`}
              >
                <MdOutlineEdit className="h-6 w-6 "/>
                Editar
              </button>
            )}
          </Menu.Item>

          {/* Eliminar */}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() =>
                  navigate(location.pathname + `?deleteFolder=${folder.id}`)
                }
                className={`${
                  active ? "bg-red-50" : ""
                } flex items-center gap-2 w-full text-left px-4 py-2 text-red-600`}
              >
                <RiDeleteBin5Line className="h-6 w-6"/>
                Eliminar
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
    </div>
  );
}
