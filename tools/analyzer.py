import os
import collections
import numpy as np
from Bio.PDB import PDBParser, calc_angle

def analyze_b_factors(pdb_path):
    parser = PDBParser(QUIET=True)
    structure = parser.get_structure('6EQE', pdb_path)
    
    residue_b_factors = {}
    for model in structure:
        for chain in model:
            for residue in chain:
                # ignore hetero residues (water, ligands)
                if residue.id[0] != ' ':
                    continue
                b_factors = []
                for atom in residue:
                    b_factors.append(atom.get_bfactor())
                if b_factors:
                    avg_b = sum(b_factors) / len(b_factors)
                    res_id = f"{chain.id}_{residue.get_resname()}_{residue.id[1]}"
                    residue_b_factors[res_id] = avg_b
                    
    # Sort by B-factor to find hotspots
    sorted_residues = sorted(residue_b_factors.items(), key=lambda item: item[1], reverse=True)
    return sorted_residues[:5]

def calculate_distance(pdb_path, res1_id, res2_id):
    parser = PDBParser(QUIET=True)
    structure = parser.get_structure('6EQE', pdb_path)
    
    # helper to find residue
    def get_residue(target_id):
        # target_id format: Chain_NAME_num, e.g., A_TRP_185
        chain_id, name, num = target_id.split('_')
        num = int(num)
        for model in structure:
            for chain in model:
                if chain.id == chain_id:
                    for residue in chain:
                        if residue.id[1] == num and residue.get_resname() == name:
                            return residue
        return None

    r1 = get_residue(res1_id)
    r2 = get_residue(res2_id)
    
    if not r1 or not r2:
        return None
        
    try:
        # Distance between CA atoms
        ca1 = r1['CA']
        ca2 = r2['CA']
        dist = ca1 - ca2
        return dist
    except KeyError:
        return None

if __name__ == "__main__":
    import sys
    pdb_path = "data/6EQE.pdb"
    hotspots = analyze_b_factors(pdb_path)
    
    if "--json" in sys.argv:
        results = {
            "pdb": pdb_path,
            "hotspots": [{"residue": res, "b_factor": round(b, 2)} for res, b in hotspots],
        }
        if len(hotspots) >= 2:
            dist = calculate_distance(pdb_path, hotspots[0][0], hotspots[1][0])
            if dist: results["distance_check"] = round(dist, 2)
        import json
        print(json.dumps(results))
    else:
        print("=== Alpha-Agent Physical Analysis ===")
        print("Top Unstable Hotspots (Highest avg B-factors):")
        for res, b_factor in hotspots:
            print(f"Residue: {res}, B-factor: {b_factor:.2f}")
            
        if len(hotspots) >= 2:
            res1 = hotspots[0][0]
            res2 = hotspots[1][0]
            dist = calculate_distance(pdb_path, res1, res2)
            if dist:
                print(f"Distance between {res1} and {res2} CA atoms: {dist:.2f} A")
