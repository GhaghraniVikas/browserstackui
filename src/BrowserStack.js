import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import windows from "./imgs/windows.png";
import linux from "./imgs/linux.png";
import mac from "./imgs/mac.png";
import chrome from "./imgs/chrome.png";
import firefox from "./imgs/firefox.png";
import edge from "./imgs/edge.png";
import ubuntu from "./imgs/ubuntu.png";
import { Dropdown } from "primereact/dropdown";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";

export default function CellEditingDemo() {
  const [products, setProducts] = useState(null);
  const [numberofrows, setNumberOfRows] = useState(null);
  const [enableAdd, setEnableAdd] = useState(false);
  let emptyrow = {
    id: "",
    osname: "",
    osversion: "",
    browsername: "",
    browserversion: "",
  };

  const [config, setConfig] = useState([
    {
      id: "1",
      osname: "windows",
      osversion: "12",
      browsername: "chrome",
      browserversion: "2",
    },
  ]);
  const osnames = [
    {
      label: (
        <div className="flex gap-2 align-items-center">
          <img src={windows} style={{ width: "20px", height: "20px" }} />
          <span>Windows</span>
        </div>
      ),
      value: "windows",
    },
    {
      label: (
        <div className="flex gap-2 align-items-center">
          <img src={ubuntu} style={{ width: "20px", height: "20px" }} />
          <span>Ubuntu</span>
        </div>
      ),
      value: "ubuntu",
    },
    {
      label: (
        <div className="flex gap-2 align-items-center">
          <img src={mac} style={{ width: "20px", height: "20px" }} />
          <span>MAC</span>
        </div>
      ),
      value: "mac",
    },
    {
      label: (
        <div className="flex gap-2 align-items-center">
          <img src={linux} style={{ width: "20px", height: "20px" }} />
          <span>Linux</span>
        </div>
      ),
      value: "linux",
    },
  ];
  const osnamestemplate = [
    { label: "Windows", value: "windows", img: windows },
    { label: "Ubuntu", value: "ubuntu", img: ubuntu },
    { label: "Mac", value: "mac", img: mac },
    { label: "Linux", value: "linux", img: linux },
  ];
  const osversions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
  ];
  const browsernames = [
    {
      label: (
        <div className="flex gap-2 align-items-center">
          <img src={chrome} style={{ width: "20px", height: "20px" }} />
          <span>Chrome</span>
        </div>
      ),
      value: "chrome",
    },
    {
      label: (
        <div className="flex gap-2 align-items-center">
          <img src={firefox} style={{ width: "20px", height: "20px" }} />
          <span>Firefox</span>
        </div>
      ),
      value: "firefox",
    },
    {
      label: (
        <div className="flex gap-2 align-items-center">
          <img src={edge} style={{ width: "20px", height: "20px" }} />
          <span>Edge</span>
        </div>
      ),
      value: "edge",
    },
  ];
  const browserversions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];
  const configs = [
    { field: "osname", header: "Os Name", options: osnames },
    { field: "osversion", header: "Os Version", options: osversions },
    { field: "browsername", header: "Browser Name", options: browsernames },
    {
      field: "browserversion",
      header: "Browser Version",
      options: browserversions,
    },
  ];

  // eslint-disable-line react-hooks/exhaustive-deps

  const [editableCells, setEditableCells] = useState({});

  // Ref for DataTable instance
  const dataTableRef = useRef(null);

  const onCellEditComplete = (e) => {
    let updatedConfig = [...config];
    let { rowData, newValue, rowIndex, field, originalEvent: event } = e;
    rowData[field] = newValue;
    config[rowIndex] = rowData;
    setConfig(config);
  };
  const statusEditor = (options) => {
    const getOptions = (field) => {
      switch (field) {
        case "osname":
          return osnames;

        case "osversion":
          return osversions;

        case "browsername":
          return browsernames;
        case "browserversion":
          return browserversions;
      }
    };
    const placeHolder = (field) => {
      switch (field) {
        case "osname":
          return "Select Os Name ";
        case "osversion":
          return "Select Os Version ";
        case "browsername":
          return "Select Browser Name ";
        case "browserversion":
          return "Select Browser Version ";
      }
    };
    return (
      <Dropdown
        value={options.value}
        options={getOptions(options.field)}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder={placeHolder(options.field)}
      />
    );
  };

  const statusEditorForNewFields = (options, field, optionvalue) => {
    if (options[field.field] == "") {
      const getOptions = (field) => {
        switch (field) {
          case "osname":
            return osnames;

          case "osversion":
            return osversions;

          case "browsername":
            return browsernames;
          case "browserversion":
            return browserversions;
        }
      };
      const placeHolder = (field) => {
        switch (field) {
          case "osname":
            return "Select Os Name ";
          case "osversion":
            return "Select Os Version ";
          case "browsername":
            return "Select Browser Name ";
          case "browserversion":
            return "Select Browser Version ";
        }
      };
      const value = (field) => {
        switch (field) {
          case "osname":
            return options.osname;
          case "osversion":
            return options.osversion;
          case "browsername":
            return options.browsername;
          case "browserversion":
            return options.browserversion;
        }
      };
      const optionsTemplate = (field) => {
        if (field.field == "osname")
          return (
            <div className="flex gap-2 align-items-center">
              <img src={chrome} style={{ width: "20px", height: "20px" }} />
              <span>Chrome</span>
            </div>
          );
      };
      return (
        <Dropdown
          value={value(field.field)}
          options={getOptions(field.field)}
          onChange={(e) => options.editorCallback(e.value)}
          placeholder={
            value(field.field) !== "" ? null : placeHolder(field.field)
          }
          itemTemplate={optionsTemplate}
        />
      );
    } else {
      const value = (field) => {
        switch (field) {
          case "osname":
            return options.osname;
          case "osversion":
            return options.osversion;
          case "browsername":
            return options.browsername;
          case "browserversion":
            return options.browserversion;
        }
      };
      const valueTemplate = (options) => {
        if (field.field == "osname") {
          switch (options.osname) {
            case "windows":
              return (
                <div className="flex gap-2">
                  <img
                    src={windows}
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span>{value(field.field)}</span>
                </div>
              );
            case "linux":
              return (
                <div className="flex gap-2">
                  <img src={linux} style={{ width: "20px", height: "20px" }} />
                  <span>{value(field.field)}</span>
                </div>
              );
            case "mac":
              return (
                <div className="flex gap-2">
                  <img src={mac} style={{ width: "20px", height: "20px" }} />
                  <span>{value(field.field)}</span>
                </div>
              );
            case "ubuntu":
              return (
                <div className="flex gap-2">
                  <img src={ubuntu} style={{ width: "20px", height: "20px" }} />
                  <span>{value(field.field)}</span>
                </div>
              );
            default:
              return <span>{value(field.field)}</span>;
          }
        } else if (field.field == "browsername") {
          switch (options.browsername) {
            case "chrome":
              return (
                <div className="flex gap-2">
                  <img src={chrome} style={{ width: "20px", height: "20px" }} />
                  <span>{value(field.field)}</span>
                </div>
              );
            case "firefox":
              return (
                <div className="flex gap-2">
                  <img
                    src={firefox}
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span>{value(field.field)}</span>
                </div>
              );
            case "edge":
              return (
                <div className="flex gap-2">
                  <img src={edge} style={{ width: "20px", height: "20px" }} />
                  <span>{value(field.field)}</span>
                </div>
              );

            default:
              return <span>{value(field.field)}</span>;
          }
        } else {
          return value(field.field);
        }
      };
      return <span className="inline-flex gap-2">{valueTemplate(options)}</span>;
    }
  };
  const addrows = () => {
    const newData = [];
    for (let i = 1; i <= numberofrows; i++) {
      newData.push({ ...emptyrow, id: config.length + i });
    }
    setConfig([...config, ...newData]);
    setNumberOfRows(null);
  };

  return (
    <>
      <div className="flex gap-2 my-1 p-5 border-round align-center">
        <InputNumber
          className="w-auto
"
          inputId="integeronly"
          placeholder="Enter number of rows"
          value={numberofrows}
          onValueChange={(e) => setNumberOfRows(e.value)}
        />
        {/* <InputText placeholder="Enter number of rows"  value={numberofrows} onChange={(e) => handleInputRows(e)} /> */}
        <span className="inline-flex flex-column	">
          <span onClick={() => setNumberOfRows((numofrows) => numofrows + 1)}>
            <i className="pi pi-angle-up" style={{ fontSize: "1.5rem" }}></i>
          </span>
          <span onClick={() => setNumberOfRows((numofrows) => numofrows - 1)}>
            <i className="pi pi-angle-down" style={{ fontSize: "1.5rem" }}></i>
          </span>
        </span>
        <Button label="Add" disabled={!numberofrows} onClick={addrows} />
      </div>
      <div className="card p-fluid p-5 shadow-1 border-500 m-1">
        <DataTable
          ref={dataTableRef}
          value={config}
          editMode="cell"
          tableStyle={{ minWidth: "50rem" }}
        >
          {configs.map(({ field, header, id }) => {
            let optionvalue;
            if (field == "osname") optionvalue = osnames;
            else if (field == "browsername") optionvalue = browsernames;
            else {
              optionvalue = "";
            }
            return (
              <Column
                key={field}
                field={field}
                header={header}
                style={{ width: "20%" }}
                body={(options, field) =>
                  statusEditorForNewFields(options, field, optionvalue)
                }
                editor={(options) => statusEditor(options)}
                onCellEditComplete={onCellEditComplete}
              />
            );
          })}
        </DataTable>
      </div>
    </>
  );
}
