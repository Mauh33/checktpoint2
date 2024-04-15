import { Resolver, Query, Arg, Mutation } from "type-graphql";
/* import { pays } from "../entities/pays";
import { continent } from "../entities/continent"; */
import db from "../db";

@Resolver()
export class PaysResolver {
  @Query(() => [pays])
  async pays(): Promise<pays[]> {

    const paysList = await db.pays.find();
    return paysList;
  }

  @Query(() => pays, { nullable: true })
  async paysByCode(@Arg("code") code: string): Promise<pays | undefined> {
    const pays = await db.pays.findOne({ where: { code } });
    return pays;
  }

  @Mutation(() => pays)
  async ajouterPays(
    @Arg("code") code: string,
    @Arg("nom") nom: string,
    @Arg("emoji") emoji: string,
    @Arg("codeContinent") codeContinent: string
  ): Promise<pays> {
    const nouveauPays = await db.pays.create({ code, nom, emoji }).save();
    return nouveauPays;
  }
}



@Resolver()
export class ContinentResolver {
  @Query(() => [continent])
  async continents(): Promise<continent[]> {

    const continentsList = await db.continent.find();
    return continentsList;
  }

  @Mutation(() => continent)
  async ajouterContinent(
    @Arg("code") code: string,
    @Arg("nom") nom: string,
    @Arg("paysId") paysId: number
  ): Promise<continent> {
    const nouveauContinent = await db.continent.create({ code, nom, paysId }).save();
    return nouveauContinent;
  }

  @Query(() => [pays], { nullable: true })
  async paysParContinent(@Arg("continentCode") continentCode: string): Promise<pays[] | undefined> {
    const continent = await db.continent.findOne({ where: { code: continentCode }, relations: ["pays"] });
    return continent?.pays;
  }
}

export default PaysResolver;
