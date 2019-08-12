export interface ListOfSurvey {
    toDos: List[];
    upComing: List[];
    continue: List[];
    completed: List[];
}

export interface List {
    trackerId: number;
    name: string;
    address: string;
    scheduleTime: string;
    contactName: string;
    contactPhone: number;
    accountManagerName: string;
    accountManagerPhone: number;
}
