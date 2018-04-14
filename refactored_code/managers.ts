'use_strict';
import {Utils} from "./utils";
import {SummaryModel, EntryModel, SummaryRegion} from "./models";

export class EntryManager {
    /**
     * Calculate summary by a given array of region entries
     * @param entries
     * @returns {SummaryModel}
     */
    generateSummary(entries: EntryModel[]): SummaryModel {
        const summary: SummaryModel = new SummaryModel();

        entries.forEach(entry => {
            const totalRegion = entry.dataSet.section.totalObs.value;
            const totalMale = entry.dataSet.section.maleObs.value;
            const totalFemale = entry.dataSet.section.femaleObs.value;

            const regionSummary = new SummaryRegion();
            regionSummary.name = entry.title;
            regionSummary.malePercent = Utils.calculatePercent(totalMale, totalRegion);
            regionSummary.femalePercent = Utils.calculatePercent(totalFemale, totalRegion);

            (totalMale > totalFemale) ? summary.stats.numMalesRegion++ : summary.stats.numFemalesRegion++;
            summary.entries.push(regionSummary);
            summary.stats.numRegions++;
            summary.stats.totalMale += totalMale;
            summary.stats.totalFemale += totalFemale;
            summary.stats.totalHabitants += totalRegion;
        });

        return summary;
    }
}