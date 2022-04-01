export interface CreatedBy {
    id: string;
    object: string;
}

export interface LastEditedBy {
    id: string;
    object: string;
}

export interface Parent {
    database_id: string;
    type: string;
}

export interface Amount {
    id: string;
    number: number;
    type: string;
}

export interface MultiSelect {
    color: string;
    id: string;
    name: string;
}

export interface Categoria {
    id: string;
    multi_select: MultiSelect[];
    type: string;
}

export interface Comment {
    id: string;
    rich_text: any[];
    type: string;
}

export interface Date2 {
    end?: any;
    start: string;
    time_zone?: any;
}

export interface Date {
    date: Date2;
    id: string;
    type: string;
}

export interface Annotations {
    bold: boolean;
    code: boolean;
    color: string;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
}

export interface Text {
    content: string;
    link?: any;
}

export interface Title {
    annotations: Annotations;
    href?: any;
    plain_text: string;
    text: Text;
    type: string;
}

export interface Spesa {
    id: string;
    title: Title[];
    type: string;
}

export interface Properties {
    Amount: Amount;
    Categoria: Categoria;
    Comment: Comment;
    Date: Date;
    Spesa: Spesa;
}

export interface Expense {
    archived: boolean;
    cover?: any;
    created_by: CreatedBy;
    created_time: Date;
    icon?: any;
    id: string;
    last_edited_by: LastEditedBy;
    last_edited_time: Date;
    object: string;
    parent: Parent;
    properties: Properties;
    url: string;
}


