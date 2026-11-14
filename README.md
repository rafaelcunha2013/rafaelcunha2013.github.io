# Binder environment for the Reinforcement Learning tutorials

This branch holds only the Python environment that [mybinder.org](https://mybinder.org) builds
for the tutorials whose code needs PyTorch (Tutorials 6 and 7). The tutorial pages on
https://rafaelcunha2013.github.io/teaching/rl-tutorials/ start a server from it and run their
code cells there.

Keeping the environment on its own branch means that changes to the website do not trigger a
rebuild: Binder rebuilds only when this branch changes, and the first start after a rebuild
takes several minutes.

- `requirements.txt`: packages, pinned to the course versions (CPU-only PyTorch).
- `runtime.txt`: Python version.

© 2025–2026 Rafael Fernandes Cunha · MIT License
