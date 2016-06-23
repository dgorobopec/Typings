// Type definitions for GoldenLayout 1.5.1
// Project: https://www.golden-layout.com

interface Settings{
    /** Properties */
    hasHeaders?: boolean ,
    constrainDragToContainer?: boolean,
    reorderEnabled?: boolean,
    selectionEnabled?: boolean,
    popoutWholeStack?: boolean,
    blockedPopoutsThrowError?: boolean,
    closePopoutsOnUnload?: boolean,
    showPopoutIcon?: boolean,
    showMaximiseIcon?: boolean,
    showCloseIcon?: boolean
}

interface Dimensions{
    /** Properties */
    borderWidth?: number,
    minItemHeight?: number,
    minItemWidth?: number,
    headerHeight?: number,
    dragProxyWidth?: number,
    dragProxyHeight?: number
}

interface Labels{
    /** Properties */
    close?: string,
    maximise?: string,
    minimise?: string,
    popout?: string
}

interface ItemConfig{
    /** Properties */
    type: string,
    componentName?: string,
    componentState?: {},
    content?: ItemConfig[],
    id?: string | string[],
    width?: number,
    height?: number,
    isClosable?: boolean,
    title?: string,
    activeItemIndex?: number

}

interface LayoutConfig{
    /** Properties */
    settings? : Settings,
    dimensions?: Dimensions,
    labels? : Labels,
    content: ItemConfig[]
}

interface ContentItem extends EventEmitter{
     /** Properties */
    config: ItemConfig;
    type: string;
    contentItems : ContentItem[];
    parent: any;
    id:string;
    isInitialised : boolean;
    isMaximised : boolean;
    isRoot: boolean;
    isRow : boolean;
    isColumn: boolean;
    isStack : boolean;
    isComponent : boolean;
    layoutManager : GoldenLayout;
    element : any;
    childElementContainer : any;
    
    /** Methods */
    addChild(itemOrItemConfig: ContentItem | ItemConfig, index?:number);
    removeChild(contentItem: ContentItem, keepChild? : boolean);
    replaceChild(oldChild: ContentItem, newChild : ContentItem | ItemConfig);
    setSize();
    setTitle(title: string);
    callDownwards(functionName: string,functionArguments?: any[],bootomUp?: boolean,skipSelf?: boolean);
    emitBubblingEvent(name: string);
    remove();
    popout();
    toggleMaximise();
    select();
    deselect();
    hasId(id: string):boolean;
    setActiveContentItem(contentItem: any);
    getActiveContentItem():ContentItem;
    addId(id: string);
    removeId(id: string);
    getItemsByFilter(filterFunction: Function): ContentItem[];
    getItemsById(id: string): ContentItem[];
    getItemsByType(type: string): ContentItem[];
    getComponentsByName(name : string): any[];
    
}

interface Container extends EventEmitter{
    /** Properties */
    width: number;
    height: number;
    parent: any;
    tab: Tab;
    title: string;
    layoutManager: GoldenLayout;
    isHidden : boolean;
    
    /** Methods */
    getElement():any;
    setElement(state: any);
    extendState(state: any);
    getState(): any;
    hide(): boolean;
    show(): boolean;
    setSize(width: number, height: number): boolean;
    setTitle(title: string);
    close(): boolean;
}

interface BrowserWindow extends EventEmitter{
    /** Properties */
    isInitialised: boolean;
    
    /** Methods */
    toConfig(): any;
    getGlInstance():GoldenLayout;
    getWindow():any;
    close();
    popIn();
}

interface Header{
    /** Properties */
    layoutManager: GoldenLayout;
    parent: any;
    tabs: Tab[];
    activeContentItem: ContentItem;
    element : any;
    tabsContainer: any;
    controlsContainer: any;
    
    /** Methods */
    setActiveContentItem(contentItem: ContentItem);
    createTab(contentItem: ContentItem, index: number);
    removeTab(contentItem: ContentItem);
}

interface Tab{
    /** Properties */
    isActive : boolean;
    header : Header;
    contentItem: ContentItem;
    element: any;
    titleElement : any;
    
    /** Methods */
    setTitle(title: string);
    setActive(isActive: boolean);
    
}

interface EventEmitter{
    on(eventName: string, callback: Function, context?: any);
    emit(eventName: string, ...args:any[]);
    trigger(eventName: string, ...args:any[]);
    unbind(eventName: string,callback?: Function,context?: any);
    off(eventName: string,callback?: Function,context?: any)
}

interface GoldenLayout extends EventEmitter{
    /** Properties */
    root : any;
    container : Container;
    isInitialised : boolean;
    config : LayoutConfig;
    selectedItem : ContentItem;
    width : number;
    height : number;
    openPopouts : BrowserWindow;
    isSubWindow : boolean;
    eventHub : EventEmitter;
    
    /** Events */
    /** Methods */
    new(configuration : LayoutConfig, container? : any) : GoldenLayout;
    registerComponent(name: string, handle: Function);
    init():void;
    toConfig():any;
    getComponent(name: string): any;
    updateSize(width?: number,height?:number);
    destroy();
    createContentItem(configuration: ItemConfig, parent?: any);
    createPopout(configOrContentItem: ContentItem | LayoutConfig, dimensions: Dimensions, parentId?: string, indexInParent?: number);
    createDragSource(element: any, itemConfiguration: ItemConfig);
    selectItem(contentItem : ContentItem);
    static minifyConfig(configuration : LayoutConfig):any;
    static unminifyConfig(minifiedConfig : LayoutConfig):any;
    
}

declare module GoldenLayout{
}