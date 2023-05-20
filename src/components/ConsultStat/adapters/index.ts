import { Stat, StatDto } from "../models";

export function statAdapter(data: StatDto): Stat {
  return {
    count_human_dna: data.count_human_dna,
    count_mutant_dna: data.count_mutant_dna,
    ratio: data.ratio
  }
}