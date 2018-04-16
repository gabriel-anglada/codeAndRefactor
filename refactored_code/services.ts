'use_strict';
import {EntryModel} from "./models";
import {ENTRY_DATA} from "./data";

export class EntryService {

    /**
     * Get data syncronously and parse it to models
     * A promise could be implemented instead of doing a syncronous call. I have prefered to mantain this method
     * syncronous because of the nature of the original code. To see a Promise implementation, you can check
     * the other repository (in the saveData method in data.service.ts file)
     */
    getEntries(): EntryModel[] {
        var entries: EntryModel[] = [];
        ENTRY_DATA.entry.forEach(entry => {
            entries.push(new EntryModel(entry));
        });
        return entries;
    }
}
