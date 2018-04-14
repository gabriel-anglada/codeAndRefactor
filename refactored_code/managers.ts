'use_strict';
import {Utils} from "./utils";
import {SummaryModel, EntryModel, SummaryRegion} from "./models";

export class EntryManager {
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

/*
 for (let comarca of data.entry) {
     let comarcaTotal = comarca['cross:DataSet']['cross:Section']['cross:Obs'][2].OBS_VALUE;
     let mp = calcPercent(comarca['cross:DataSet']['cross:Section']['cross:Obs'][0], comarcaTotal);
     let fp = calcPercent(comarca['cross:DataSet']['cross:Section']['cross:Obs'][1], comarcaTotal);
     let summaryComarca = {
         'name': comarca.title,
         'malePercent': mp,
         'femalePercent': fp
     }
     if (mp > fp) {
        summary.stats.numeroComarcasMasHombres++;
     } else {
        summary.stats.numeroComarcasMasMujeres++;
     }
     summary.entry.push(summaryComarca);
     summary.stats.numeroComarcasTotal++;
     summary.stats.numeroTotalHabitantesHombres += Number(comarca['cross:DataSet']['cross:Section']['cross:Obs'][0].OBS_VALUE);
     summary.stats.numeroTotalHabitantesMujeres += Number(comarca['cross:DataSet']['cross:Section']['cross:Obs'][1].OBS_VALUE);
     summary.stats.numeroTotalHabitantes += summary.stats.numeroTotalHabitantesHombres + summary.stats.numeroTotalHabitantesMujeres; //suma incorrecte, summary.stats.numeroTotalHabitantesHombres és el total actual, no l'increment
 }
 */