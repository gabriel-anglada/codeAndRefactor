'use_strict';
import {IJSONAble} from "./interfaces";

export class ObsModel implements IJSONAble {
    constructor(data: any) {
        this.fromJSON(data);
    }

    private _status: obsStatusType;

    private _sex: sexType;
    get sex(): sexType {
        return this._sex;
    }

    private _value: number;
    get value(): number {
        return this._value;
    }

    fromJSON(data: any) {
        this._status = data['OBS_STATUS'];
        this._sex = data['SEX'];
        this._value = parseInt(data['OBS_VALUE']);
    }

    /**
     * Not implemented because dta is not needed to update in server side
     */
    toJSON(): any {
        return {};
    }
}

export class SectionModel implements IJSONAble {
    constructor(data: any) {
        this.fromJSON(data);
    }
    private _obs: ObsModel[] = [];
    private _getObsBySex(value: sexType): ObsModel {
        for(let i = 0; i < this._obs.length; i++) {
            if(this._obs[i].sex == value) return this._obs[i];
        }
        return null;
    }
    get femaleObs(): ObsModel {
        return this._getObsBySex('F');
    }
    get maleObs(): ObsModel {
        return this._getObsBySex('M');
    }
    get totalObs(): ObsModel {
        return this._getObsBySex('T');
    }

    private _area: string;

    private _frequency: frequencyType;

    private _decimals: number;

    private _unitMult: string;

    private _timePeriod: string;

    fromJSON(data: any) {
        this._obs = data['cross:Obs'] ? data['cross:Obs'].map(obs => new ObsModel(obs)) : [];
        this._area = data['AREA'];
        this._decimals = parseInt(data['DECIMALS']);
        this._frequency = data['FREQ'];
        this._timePeriod = data['TIME_PERIOD'];
        this._unitMult = data['UNIT_MULT'];
    }

    /**
     * Not implemented because dta is not needed to update in server side
     */
    toJSON(): any {
        return {};
    }
}

export class DataSetModel implements IJSONAble {
    constructor(data: any) {
        this.fromJSON(data);
    }

    private _section: SectionModel;
    get section(): SectionModel {
        return this._section;
    }

    fromJSON(data: any) {
        this._section = new SectionModel(data['cross:Section']);
    }

    /**
     * Not implemented because dta is not needed to update in server side
     */
    toJSON(): any {
        return {};
    }
}

export class EntryModel implements IJSONAble {
    constructor(data: any) {
        this.fromJSON(data);
    }

    private _id: string;
    get id(): string {
        return this._id;
    }

    private _dataSet: DataSetModel;
    get dataSet(): DataSetModel {
        return this._dataSet;
    }

    private _link: {href, type};
    get link(): {href, type} {
        return this._link;
    }

    private _title: string;
    get title(): string {
        return this._title;
    }

    private _categories: {term}[];
    get categories(): {term}[] {
        return this._categories;
    }

    private _updatedAt: Date;
    get updatedAt(): Date {
        return this._updatedAt;
    }

    private _content: {'xml:lang', content};
    get content(): {'xml:lang', content} {
        return this._content;
    }

    fromJSON(data: any) {
        this._id = data['id'];
        this._dataSet = new DataSetModel(data['cross:DataSet']);
        this._link = data['link'];
        this._title = data['title'];
        this._categories = data['category'];
        this._updatedAt = new Date(data['updatedAt']);
        this._content = data['content'];
    }

    /**
     * Not implemented because dta is not needed to update in server side
     */
    toJSON(): any {
        return {};
    }
}

export class SummaryModel {
    constructor() {}

    private _stats: SummaryStatsModel = new SummaryStatsModel();
    get stats(): SummaryStatsModel {
        return this._stats;
    }

    private _entries: SummaryRegion[] = [];
    get entries(): SummaryRegion[] {
        return this._entries;
    }
}

export class SummaryStatsModel {
    private _numMalesRegion: number = 0;
    set numMalesRegion(value: number) {
        this._numMalesRegion = value;
    }
    get numMalesRegion(): number {
        return this._numMalesRegion;
    }

    private _numFemalesRegion: number = 0;
    set numFemalesRegion(value: number) {
        this._numFemalesRegion = value;
    }
    get numFemalesRegion(): number {
        return this._numFemalesRegion;
    }

    private _numRegions: number = 0;
    set numRegions(value: number) {
        this._numRegions = value;
    }
    get numRegions(): number {
        return this._numRegions;
    }

    private _totalMale: number = 0;
    set totalMale(value: number) {
        this._totalMale = value;
    }
    get totalMale(): number {
        return this._totalMale;
    }

    private _totalFemale: number = 0;
    set totalFemale(value: number) {
        this._totalFemale = value;
    }
    get totalFemale(): number {
        return this._totalFemale;
    }

    private _totalHabitants: number = 0;
    set totalHabitants(value: number) {
        this._totalHabitants = value;
    }
    get totalHabitants(): number {
        return this._totalHabitants;
    }
}

export class SummaryRegion {
    private _name: string;
    set name(value: string) {
        this._name = value;
    }

    private _malePercent: number = 0;
    set malePercent(value: number) {
        this._malePercent = value;
    }

    private _femalePercent: number = 0;
    set femalePercent(value: number) {
        this._femalePercent = value;
    }
}