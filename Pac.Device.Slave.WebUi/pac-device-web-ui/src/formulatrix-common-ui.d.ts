declare module "fmlx-common-ui" {
  export function FmlxIcon(props: FmlxIconProps): JSX.Element;

  export interface FmlxIconProps {
    name: string;
    customColor?: string;
    size?: "xs" | "sm" | "md" | "lg";
    id?: string;
  }

  export function FmlxNavigationSidebar(
    props: FmlxNavigationSidebarProps
  ): JSX.Element;

  export interface FmlxNavigationSidebarProps {
    items?: FmlxNavigationSidebarItem[];
    bottomPositionItemId?: number;
    theme?: "light" | "dark";
    selectedItem: {
      current: number | null;
      previous: number | null;
    };
    onBlur?: () => void;
    id?: string;
  }

  export interface FmlxNavigationSidebarItem {
    id: number;
    parentId: number | null;
    type?: "icon" | "text" | "image" | "icon-text" | "divider";
    text?: string;
    description?: string;
    icon?: any;
    imagePath?: string;
    onClick?: ({ id, hasChild }) => void;
  }

  export function FmlxMotionControlPad(
    props: FmlxMotionControlPadProps
  ): JSX.Element;

  export interface FmlxMotionControlPadPosition {
    x?: number;
    y?: number;
    z?: number;
  }

  export interface FmlxMotionControlPadSliderProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
  }

  export interface FmlxMotionControlPadCheckBoxProps {
    x?: {
      checked: boolean;
      onChange: React.ChangeEventHandler<HTMLInputElement>;
    };
    y?: {
      checked: boolean;
      onChange: React.ChangeEventHandler<HTMLInputElement>;
    };
    z?: {
      checked: boolean;
      onChange: React.ChangeEventHandler<HTMLInputElement>;
    };
  }

  export interface FmlxMotionControlPadMovement {
    xy?: {
      value: string;
      onChange: (value: string) => void;
    };
    x?: {
      value: string;
      onChange: (value: string) => void;
    };
    y?: {
      value: string;
      onChange: (value: string) => void;
    };
    z?: {
      value: string;
      onChange: (value: string) => void;
    };
  }

  export interface FmlxMotionControlPadTooltipDescription {
    x?: {
      left: string;
      right: string;
    };
    y?: {
      top: string;
      bottom: string;
    };
    z?: {
      top: string;
      bottom: string;
    };
  }

  export type FmlxMotionControlPadButtonPosition =
    | "X+"
    | "X-"
    | "Y+"
    | "Y-"
    | "Z+"
    | "Z-"
    | "absolute-x"
    | "absolute-y"
    | "absolute-z";

  export interface FmlxMotionControlPadProps {
    title?: React.ReactNode;
    currentPositionValue?: FmlxMotionControlPadPosition;
    sliderProps?: FmlxMotionControlPadSliderProps;
    checkboxProps?: FmlxMotionControlPadCheckBoxProps;
    movementControlValue?: FmlxMotionControlPadMovement;
    tooltipDescription?: FmlxMotionControlPadTooltipDescription;
    showX?: boolean;
    showY?: boolean;
    showZ?: boolean;
    showSlider?: boolean;
    showMotorHoming?: boolean;
    disabled?: boolean;
    required?: boolean;
    type?: "relative" | "absolute" | "rotation";
    onMovementControlClick?: (
      buttonPosition: FmlxMotionControlPadButtonPosition
    ) => void;
    onMotorHomingClick?: () => void;
    id?: string;
  }

  export function FmlxTab(props: FmlxTabProps): JSX.Element;

  export interface FmlxTabItem {
    title?: string;
    content: React.ReactNode;
    icon?: any;
    disabled: boolean;
  }

  export interface FmlxTabProps {
    items: FmlxTabItem[];
    selectedTab?: number;
    variant?: "standard" | "fullWidth" | "scrollable";
    orientation?: "horizontal" | "vertical";
    onChange?: ({ index: number }) => void;
    id?: string;
  }

  export function FmlxTextBox(props: any): JSX.Element;

  export interface FmlxSliderProps {
    label?: string;
    value?: number;
    type?: "single" | "range";
    decoration?: "none" | "double-icon" | "textbox" | "icon-textbox" | "marks";
    icon?: React.ReactNode;
    disabled?: boolean;
    marks?: { value: number; label: string }[];
    onChange?: (value: number) => void;
    id?: string;
  }

  export function FmlxSlider({
    label = "Label",
    value = 0,
    type = "single",
    decoration = "textbox",
    icon = null,
    disabled = false,
    marks = [
      { value: 0, label: "0" },
      { value: 50, label: "50" },
      { value: 100, label: "100" },
    ],
    id = "fmlx-slider",
  }: FmlxSliderProps): JSX.Element;

  export interface FmlxSwitchProps {
    label?: string;
    labelPlacement?: "start" | "end" | "top" | "bottom";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    withIcon?: boolean;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    id?: string;
  }

  export function FmlxSwitch({
    label = "",
    labelPlacement = "start",
    size = "md",
    withIcon = false,
    checked = false,
    disabled = false,
    id = "fmlx-switch",
  }: FmlxSwitchProps);

  export function FmlxButton(props: FmlxButtonProps):JSX.Element;

  export interface FmlxButtonProps{
    id?: string;
    label?: string;
    size?: string;
    onClick?: ({ id, hasChild }) => void;
    fullWidth?: bool;
    disabled?: boolean;
  }

  export function FmlxTable(props: FmlxTableProps): JSX.Element;

  export interface FmlxheaderStyle{
    width?: string;
    minWidth?: string;
    maxWidth?: boolean;
  }

  export interface FmlxColumnItem{
    Header?: string;
    accessor?: string;
    editable?: boolean;
    headerStyle?: FmlxheaderStyle;
    Cell?: React.ReactNode;
  }

  export interface FmlxTableProps{
    type?: "basic" | "multiselect" | "collapsible";
    columns?:FmlxColumnItem[];
    data?: any[];
    onRowClick?: ({rowData}) => void
    selectedRowIds?: any[]
    getSelectedRow?: (selectedItems: any[], rowIds: any[]) => void
  }
}
