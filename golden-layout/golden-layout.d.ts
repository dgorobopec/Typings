// Type definitions for GoldenLayout 1.5.1
// Project: https://www.golden-layout.com
// Definitions by: Davig GONZALEZ <https://github.com/dgorobopec>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module GoldenLayout{
    interface Settings{
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
        borderWidth?: number,
        minItemHeight?: number,
        minItemWidth?: number,
        headerHeight?: number,
        dragProxyWidth?: number,
        dragProxyHeight?: number
    }

    interface Labels{
        close?: string,
        maximise?: string,
        minimise?: string,
        popout?: string
    }

    interface ItemConfig{
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
        settings? : Settings,
        dimensions?: Dimensions,
        labels? : Labels,
        content: ItemConfig[]
    }

    interface ContentItem extends EventEmitter{
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
        width: number;
        height: number;
        parent: any;
        tab: Tab;
        title: string;
        layoutManager: GoldenLayout;
        isHidden : boolean;
        
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
        isInitialised: boolean;
        
        toConfig(): any;
        getGlInstance():GoldenLayout;
        getWindow():any;
        close();
        popIn();
    }

    interface Header{
        layoutManager: GoldenLayout;
        parent: any;
        tabs: Tab[];
        activeContentItem: ContentItem;
        element : any;
        tabsContainer: any;
        controlsContainer: any;
        
        setActiveContentItem(contentItem: ContentItem);
        createTab(contentItem: ContentItem, index: number);
        removeTab(contentItem: ContentItem);
    }

    interface Tab{
        isActive : boolean;
        header : Header;
        contentItem: ContentItem;
        element: any;
        titleElement : any;
        
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
}