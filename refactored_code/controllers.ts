'use_strict';
import {EntryManager} from "./managers";
import {EntryService} from "./services";
import {EntryModel, SummaryModel} from "./models";
import {Logger} from "./utils";

export class MainController {
    private _entryService: EntryService = new EntryService();
    private _entryManager: EntryManager = new EntryManager();

    private _entries: EntryModel[];
    private _summary: SummaryModel;

    /**
     * Get the data syncronously and generates a summary
     */
    initialize() {
        this._entries = this._entryService.getEntries();
        this._summary = this._entryManager.generateSummary(this._entries);
    }

    /**
     * Results are presented via console, but they could be presented via web with other implementation
     */
    render() {
        Logger.log(this._summary);
    }
}