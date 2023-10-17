import {
  FmlxIcon,
  FmlxNavigationSidebar
} from "fmlx-common-ui";
import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchModuleStatus } from "./Fetch/FetchModuleStatus";
import CarrierView from "./Pages/CarrierView";
import ScaraView from "./Pages/Scara/ScaraView";
import VectorView from "./Pages/VectorView";
import { useAppSelector, useTypedDispatch } from "./Redux/Hook";
import {
  moduleFetchStatusSelector,
} from "./Redux/ModuleStatusSlice";
import RepeatabilityView from "./Pages/RepeatabilityView";
import MapView from "./Pages/Map/MapView";

enum PacPages {
  Vector = 1,
  Carrier = 2,
  Scara = 3,
  Repeatability = 4,
  Map = 5
}

function App() {
  const [selectedItem, setSelectedItem] = useState({
    current: null as PacPages | null,
    previous: null as PacPages | null,
  });

  const dispatch = useTypedDispatch();

  const fetchModuleStatusStatus = useAppSelector(moduleFetchStatusSelector);

  useEffect(() => {
    dispatch(fetchModuleStatus());
  }, [dispatch]);

  const handleClick = ({ id, hasChild }: { id: number; hasChild: boolean }) => {
    console.log("handleClick, id", id);
    console.log("handleClick, hasChild", hasChild);
    if (hasChild) {
      setSelectedItem({ ...selectedItem, current: id });
    } else {
      setSelectedItem({ current: null, previous: id });
    }
  };

  const onBlur = () => {
    setSelectedItem({ ...selectedItem, current: null });
  };

  if (fetchModuleStatusStatus.completed === false) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <div className="app-container">
        <div className="app-header">Process Automation Centre Device</div>
        <div className="app-sidebar">
          <FmlxNavigationSidebar
            onBlur={onBlur}
            selectedItem={selectedItem}
            theme="dark"
            items={[
              {
                id: 0,
                parentId: null,
                type: "icon",
                icon: <FmlxIcon name="Nt8" />,
                onClick: () => {},
              },
              {
                id: PacPages.Vector,
                parentId: null,
                type: "icon-text",
                icon: <FmlxIcon name="Users" />,
                text: "Vector",
                onClick: handleClick,
              },
              {
                id: PacPages.Carrier,
                parentId: null,
                type: "icon-text",
                icon: <FmlxIcon name="Users" />,
                text: "Carrier",
                onClick: handleClick,
              },
              {
                id: PacPages.Scara,
                parentId: null,
                type: "icon-text",
                icon: <FmlxIcon name="Users" />,
                text: "Scara",
                onClick: handleClick,
              },
              {
                id: PacPages.Repeatability,
                parentId: null,
                type: "icon-text",
                icon: <FmlxIcon name="Users" />,
                text: "Repeatability",
                onClick: handleClick,
              },
              {
                id: PacPages.Map,
                parentId: null,
                type: "icon-text",
                icon: <FmlxIcon name="Users" />,
                text: "Map",
                onClick: handleClick,
              },
            ]}
          />
        </div>
        <div className="app-content">
          {selectedItem.previous === PacPages.Vector && <VectorView />}
          {selectedItem.previous === PacPages.Carrier && <CarrierView />}
          {selectedItem.previous === PacPages.Scara && <ScaraView />}
          {selectedItem.previous === PacPages.Repeatability && <RepeatabilityView />}
          {selectedItem.previous === PacPages.Map && <MapView />}
        </div>
      </div>
    </div>
  );
}

export default App;
