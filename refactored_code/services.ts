'use_strict';
import {EntryModel} from "./models";
import {ENTRY_DATA} from "./data";

export class EntryService {
    getEntries(): EntryModel[] {
        var entries: EntryModel[] = [];
        ENTRY_DATA.entry.forEach(entry => {
            entries.push(new EntryModel(entry));
        });
        return entries;
    }
}