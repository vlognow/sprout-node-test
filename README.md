# sprout-node-test

Throwaway validation prototype for SPROUT's new `node-server` language (see machi PR #382, prototype-template PR #12, k8s-prototypes PR #479). A real Express server + `better-sqlite3`, reading `PORT`/`DB_PATH` from the environment — intentionally ships no `Dockerfile`, so the bootstrap skill's own language detection is what's under test, not just the Dockerfile.

Safe to delete once e2e validation of the node-server feature is complete.
