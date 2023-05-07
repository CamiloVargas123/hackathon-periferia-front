import { describe, it, expect } from "vitest"
import { validSequencie } from "./validSequencie";

describe("Valid sequuencie mutans", () => {
  it.concurrent("test ADN 1", () => {
    const ADN: string[] = [
      "ATGCGA",
      "CAGTGC",
      "TTATGT",
      "AGAAGG",
      "CCCCTA",
      "TCACTG",
    ];
    const expectedResult = true
    const result = validSequencie({ adn: ADN })
    expect(result).equal(expectedResult)
  })
  it.concurrent("test ADN 2", () => {
    const ADN: string[] = [
      "ATGCGA",
      "CAGTGC",
      "TTATTT",
      "AGACGG",
      "GCGTCA",
      "TCACTG",
    ];
    const expectedResult = false
    const result = validSequencie({ adn: ADN })
    expect(result).equal(expectedResult)
  })
  it.concurrent("test ADN 3", () => {
    const ADN: string[] = [
      "ATGCGATGA",
      "CAGTGCTGA",
      "TTATGTTGA",
      "AGAAGGTGA",
      "CCCCTAAAA",
      "TCACTGTGA",
    ];
    const expectedResult = true
    const result = validSequencie({ adn: ADN })
    expect(result).equal(expectedResult)
  })
})