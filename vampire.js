class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let vampire = this;
    let count = 0;
    while (vampire.creator) {
      count++;
      vampire = vampire.creator;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    let result = null;
    for (let vampire of this.offspring) {
      result = vampire.vampireWithName(name);
      if (result) {
        return result;
      }
    }
    return result;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalDescendents = 0;
    totalDescendents += this.offspring.length;
    for (let vampire of this.offspring) {
      totalDescendents += vampire.totalDescendents;
    }
    return totalDescendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];
    if (this.yearConverted > 1980) {
      millenials.push(this);
    }
    for (let vampire of this.offspring) {
      const millenialOffsprings = vampire.allMillennialVampires;
      millenials = millenials.concat(millenialOffsprings);
    }
    return millenials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this.creator === null) {
      return this;
    }
    if (vampire.creator === null) {
      return vampire;
    }
    if (this.name === vampire.name) {
      return this;
    }
    let junior, senior;
    if (this.isMoreSeniorThan(vampire)) {
      junior = vampire;
      senior = this;
    } else {
      junior = this;
      senior = vampire;
    }
    while (junior.numberOfVampiresFromOriginal !== senior.numberOfVampiresFromOriginal) {
      junior = junior.creator;
    }
    if (junior.name === senior.name) {
      return senior;
    }
    let commonAncestor = null;
    while ((junior.creator.name !== senior.creator.name) || !junior.creator || !senior.creator) {
      junior = junior.creator;
      senior = senior.creator;
    }
    commonAncestor = junior.creator;
    return commonAncestor;
  }
}


module.exports = Vampire;

