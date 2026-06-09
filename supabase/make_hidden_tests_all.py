import importlib
import pkgutil
from pathlib import Path

from generate_hidden_tests import OUTPUT_PATH, TITLES, TEST_INPUTS, compute_output, parse_input
import json


def load_all_inputs() -> None:
    import hidden_test_inputs  # noqa: F401

    for module in Path(__file__).parent.glob("finish_inputs*.py"):
        name = module.stem
        if name == "finish_inputs_loader":
            continue
        importlib.import_module(name)


def main() -> None:
    load_all_inputs()
    lines = [
        "-- Hidden test cases for all 100 PeerCode questions",
        "-- Run in Supabase SQL Editor after questions are seeded",
        "ALTER TABLE questions ADD COLUMN IF NOT EXISTS hidden_tests jsonb;",
        "",
    ]
    missing = []
    for title in TITLES:
        inputs = TEST_INPUTS.get(title, [])
        if len(inputs) != 10:
            missing.append((title, len(inputs)))
            continue
        cases = []
        for inp_str in inputs:
            out = compute_output(title, parse_input(inp_str))
            cases.append({"input": inp_str, "output": out})
        safe_title = title.replace("'", "''")
        lines.append("UPDATE questions SET hidden_tests = $json$")
        lines.append(json.dumps(cases, indent=2))
        lines.append(f"$json$::jsonb WHERE title = '{safe_title}';")
        lines.append("")
    if missing:
        raise SystemExit(f"Missing inputs: {missing[:10]} ... total {len(missing)}")
    out = Path(__file__).parent / OUTPUT_PATH
    out.write_text("\n".join(lines), encoding="utf-8")
    updates = sum(1 for line in lines if line.startswith("UPDATE questions"))
    print(f"Wrote {out} with {updates} UPDATE statements")


if __name__ == "__main__":
    main()
